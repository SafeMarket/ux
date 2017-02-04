const Pricemorph = require('./Pricemorph')
const Amorph = require('./Amorph')
const settingsManager = require('../settingsManager')
const contracts = require('safemarket-protocol/modules/contracts')
const getUnixMultihash = require('../utils/getUnixMultihash')
const CENTI = require('../constants/CENTI')
const PICO = require('../constants/PICO')
const TERA = require('../constants/TERA')
const solWrappers = require('../solWrappers')
const SolWrapper = require('ultralightbeam/lib/SolWrapper')
const ultralightbeam = require('../ultralightbeam')
const currencies = require('../currencies')
const NoUpdatesError = require('../errors/NoUpdates')
const ZERO = require('../constants/ZERO')
const protofile = require('../protofile')
const protobufjs = require('protobufjs')
const _ = require('lodash')
const ipfsAmorphApi = require('../ipfsAmorphApi')
const aliasReg = require('../aliasReg')
const Q = require('q')
const schemas = require('safemarket-protocol/modules/schemas')

const ArbitratorType = protobufjs.parse(protofile.to('utf8')).root.lookup('safemarket.Arbitrator')


function Arbitrator(address) {
  this.address = address
  this.schema = schemas.Store
  this.solWrapper = new SolWrapper(ultralightbeam, contracts.Proxy.abi, address)

  if (address) {
    this.download()
  } else {
    this.setDefaults()
  }
}

Arbitrator.prototype.download = function download() {
  const deferred = Q.defer()
  this.promise = deferred.promise
  this.isReady = false
  return this.statesync.download().then(() => {
    return this.setFromChainState().then(() => {
      this.isReady = true
      deferred.resolve(this)
    })
  })
}

Arbitrator.prototype.setDefaults = function setDefaults() {
  const settings = settingsManager.get()
  this.isOpen = new Amorph(true, 'boolean')
  this.currency = settings.currency
  this.feeBase = new Pricemorph(ZERO, this.currency.to('ascii'))
  this.feeCentiperun = new Amorph(3, 'number')
  this.alias = new Amorph('', 'ascii')
  this.approvedStoreAliases = []
}

Arbitrator.prototype.setFromChainState = function setFromChainState() {
  const variables = this.statesync.chainState.variables
  const uniqueArrays = this.statesync.chainState.uniqueArrays
  this.isOpen = variables.isOpen.clone()
  this.currency = currencies[variables.currency.to('ascii')]
  const feeBaseBignumber = variables.feeTerabase.to('bignumber').div(TERA)
  const feeBase = new Amorph(feeBaseBignumber, 'bignumber')
  this.feeBase = new Pricemorph(feeBase, this.currency.to('ascii'))
  const feeCentiperunBignumber = variables.feeMicroperun.to('bignumber').times(PICO).div(CENTI)
  this.feeCentiperun = new Amorph(feeCentiperunBignumber, 'bignumber')
  this.approvedStoreAliases = uniqueArrays.approvedStoreAlias.map((alias) => {
    return alias.clone()
  })

  return Q.all([
    ipfsAmorphApi.getFile(variables.metaMultihash).then((metaFile) => {
      this.meta = ArbitratorType.decode(metaFile.to('buffer'))
      this.name = this.meta.name
      this.info = this.meta.info
    }),
    aliasReg.getAlias(this.address).then((alias) => {
      this.alias = alias
    })
  ])
}

Arbitrator.prototype.getMeta = function getMeta() {
  return {
    name: this.name || '',
    info: this.info || ''
  }
}

Arbitrator.prototype.getMetaMultihash = function getMetaMultihash() {
  return getUnixMultihash(this.getMetaFile())
}

Arbitrator.prototype.getLocalState = function getLocalState() {

  const feeTerabaseBignumber = this.feeBase.to(this.currency.to('ascii')).to('bignumber').times(TERA)
  const feeTerabase = new Amorph(feeTerabaseBignumber, 'bignumber')
  const feeMicroperunBignumber = this.feeCentiperun.to('bignumber').times(CENTI).div(PICO)
  const feeMicroperun = new Amorph(feeMicroperunBignumber, 'bignumber')

  return {
    variables: {
      isOpen: this.isOpen,
      currency: this.currency,
      feeTerabase: feeTerabase,
      feeMicroperun: feeMicroperun,
      metaMultihash: this.getMetaMultihash()
    },
    uniqueArrays: {
      approvedStoreAlias: this.approvedStoreAliases
    }
  }
}

Arbitrator.prototype.getMetaFile = function getMetaFile() {
  const meta = _.omit(this.getMeta(), _.isUndefined)
  const metaProto = ArbitratorType.create(meta)
  const metaFileUint8Array = ArbitratorType.encode(metaProto).finish()
  return new Amorph(metaFileUint8Array, 'uint8Array')
}

Arbitrator.prototype.getTransactionRequest = function getTransactionRequest() {
  console.log('getTransactionRequest')
  const calldataArray = []
  const calldataLengths = []
  const updates = this.statesync.getUpdates(this.getLocalState())

  if (this.address && updates.length === 0) {
    throw new NoUpdatesError()
  }

  if (!this.address) {
    updates.push({
      methodAbi: 'set_isOwner(address,bool)',
      args: [
        settingsManager.get().profile.persona.address,
        new Amorph(true, 'boolean')
      ]
    })

    const aliasCalldata = aliasReg.solWrapper.getCalldata('register(bytes32)', [this.alias])
    updates.push({
      methodAbi: 'execute(address,uint256[],bytes)',
      args: [
        aliasReg.address,
        [new Amorph(aliasCalldata.to('array').length, 'number')],
        aliasCalldata
      ]
    })
  }

  updates.map((update) => {
    return solWrappers.Arbitrator.getCalldata(update.methodAbi, update.args)
  }).forEach((calldata) => {
    const _calldataArray = calldata.to('array')
    calldataArray.push(..._calldataArray)
    calldataLengths.push(new Amorph(_calldataArray.length, 'number'))
  })

  const calldata = new Amorph(calldataArray, 'array')
  if (!this.address) {
    return solWrappers.Multiprox.getTransactionRequest('createAndExecute(bytes32,uint256[],bytes)', [
      contracts.Proxy.codeHash,
      calldataLengths,
      calldata
    ])
  }
  return solWrappers.Multiprox.getTransactionRequest('execute(address,uint256[],bytes)', [
    this.address,
    calldataLengths,
    calldata
  ])
}

Arbitrator.prototype.addApprovedStoreAlias = function addApprovedStoreAlias() {
  this.approvedStoreAliases.push(new Amorph('', 'ascii'))
}

module.exports = Arbitrator

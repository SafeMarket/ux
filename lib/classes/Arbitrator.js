const Pricemorph = require('./Pricemorph')
const Amorph = require('./Amorph')
const settingsManager = require('../settingsManager')
const contracts = require('safemarket-protocol/modules/contracts')
const getUnixMultihash = require('../utils/getUnixMultihash')
const solWrappers = require('../solWrappers')
const SolWrapper = require('ultralightbeam/lib/SolWrapper')
const ultralightbeam = require('../ultralightbeam')
const currencies = require('../currencies')
const NoUpdatesError = require('../errors/NoUpdates')
const ZERO = require('../constants/ZERO')
const _ = require('lodash')
const ipfsAmorphApi = require('../ipfsAmorphApi')
const aliasReg = require('../aliasReg')
const Q = require('q')
const schemas = require('safemarket-protocol/modules/schemas')
const protobufferTypes = require('../protobufferTypes')

function Arbitrator(address) {
  this.address = address
  this.schema = schemas.Arbitrator
  this.solWrapper = new SolWrapper(ultralightbeam, contracts.Proxy.abi, address)

  if (address) {
    this.promise = this.download()
  } else {
    this.setDefaults()
  }
}

Arbitrator.prototype.download = function download() {
  this.isReady = false
  return this.schema.download((method, args) => {
    return this.solWrapper.fetch(method, args)
  }).then(() => {
    return this.setFromChainState().then(() => {
      this.isReady = true
    })
  })
}

Arbitrator.prototype.setDefaults = function setDefaults() {
  const settings = settingsManager.get()
  this.isOpen = new Amorph(true, 'boolean')
  this.currency = settings.currency
  this.feeBase = new Pricemorph(ZERO, this.currency.to('ascii'))
  this.feeMicroperun = new Amorph(30000, 'number')
  this.alias = new Amorph('', 'ascii')
  this.approvedStoreAliases = []
}

Arbitrator.prototype.setFromChainState = function setFromChainState() {
  const state = this.schema.state
  this.isOpen = state.isOpen.clone()
  this.currency = currencies[state.currency.to('ascii')]
  this.feeBase = new Pricemorph(state.feeBase, this.currency.to('ascii'))
  this.feeMicroperun = state.feeMicroperun.clone()
  this.metaMultihash = state.metaMultihash.clone()
  this.approvedArbitratorAliases = []
  return Q.all([
    ipfsAmorphApi.getFile(this.metaMultihash).then((metaFile) => {
      this.meta = protobufferTypes.Arbitrator.decode(metaFile.to('buffer'))
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
  return {
    isOpen: this.isOpen.clone(),
    currency: this.currency.clone(),
    feeBase: this.feeBase.to(this.currency.to('ascii')).clone(),
    feeMicroperun: this.feeMicroperun.clone(),
    metaMultihash: this.getMetaMultihash()
  }
}

Arbitrator.prototype.getMetaFile = function getMetaFile() {
  const meta = _.omit(this.getMeta(), _.isUndefined)
  const metaProto = protobufferTypes.Arbitrator.create(meta)
  const metaFileUint8Array = protobufferTypes.Arbitrator.encode(metaProto).finish()
  return new Amorph(metaFileUint8Array, 'uint8Array')
}

Arbitrator.prototype.getTransactionRequest = function getTransactionRequest() {
  const calldataArray = []
  const calldataLengths = []
  const updates = []

  this.schema.upload(this.getLocalState(), (method, args) => {
    updates.push({ method, args })
    return Q.resolve()
  })

  if (this.address && updates.length === 0) {
    throw new NoUpdatesError()
  }

  if (!this.address) {
    updates.push({
      method: 'setOwner(address,bool)',
      args: [
        settingsManager.get().profile.persona.address,
        new Amorph(true, 'boolean')
      ]
    })
    updates.push({
      method: 'set_bool(bytes32,bool)',
      args: [
        new Amorph('isArbitrator', 'ascii'),
        new Amorph(true, 'boolean')
      ]
    })

    const aliasCalldata = aliasReg.solWrapper.getCalldata('register(bytes32)', [this.alias])
    updates.push({
      method: 'execute(address,uint256[],bytes)',
      args: [
        aliasReg.address,
        [new Amorph(aliasCalldata.to('array').length, 'number')],
        aliasCalldata
      ]
    })
  }

  updates.map((update) => {
    console.log(update)
    return solWrappers.Proxy.getCalldata(update.method, update.args)
  }).forEach((calldata) => {
    const _calldataArray = calldata.to('array')
    calldataArray.push(..._calldataArray)
    calldataLengths.push(new Amorph(_calldataArray.length, 'number'))
  })
  const calldata = new Amorph(calldataArray, 'array')
  if (!this.address) {
    return solWrappers.God.getTransactionRequest('createAndExecute(bytes32,uint256[],bytes)', [
      contracts.Proxy.codeHash,
      calldataLengths,
      calldata
    ])
  }
  return solWrappers.God.getTransactionRequest('execute(address,uint256[],bytes)', [
    this.address,
    calldataLengths,
    calldata
  ])
}

Arbitrator.prototype.addApprovedStoreAlias = function addApprovedStoreAlias() {
  this.approvedStoreAliases.push(new Amorph('', 'ascii'))
}

module.exports = Arbitrator

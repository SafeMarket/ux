const StoreProduct = require('./StoreProduct')
const StoreTransport = require('./StoreTransport')
const Pricemorph = require('./Pricemorph')
const Amorph = require('./Amorph')
const settingsManager = require('../settingsManager')
const disputeSecondsOptions = require('../disputeSecondsOptions')
const contracts = require('safemarket-protocol/modules/contracts')
const getUnixMultihash = require('../utils/getUnixMultihash')
const solWrappers = require('../solWrappers')
const SolWrapper = require('ultralightbeam/lib/SolWrapper')
const ultralightbeam = require('../ultralightbeam')
const places = require('../places')
const currencies = require('../currencies')
const NoUpdatesError = require('../errors/NoUpdates')
const ZERO = require('../constants/ZERO')
const _ = require('lodash')
const ipfsAmorphApi = require('../ipfsAmorphApi')
const aliasReg = require('../aliasReg')
const Q = require('q')
const schemas = require('safemarket-protocol/modules/schemas')
const MICRO = require('../constants/MICRO')
const protobufferTypes = require('../protobufferTypes')

function Store(address) {
  this.address = address
  this.schema = schemas.Store
  this.solWrapper = new SolWrapper(ultralightbeam, contracts.Proxy.abi, address)

  if (address) {
    this.promise = this.download()
  } else {
    this.setDefaults()
  }
}

Store.prototype.download = function download() {
  this.isReady = false
  return this.schema.download((method, args) => {
    return this.solWrapper.fetch(method, args)
  }).then(() => {
    return this.setFromChainState().then(() => {
      this.isReady = true
    })
  })
}

Store.prototype.setDefaults = function setDefaults() {
  const settings = settingsManager.get()
  this.isOpen = new Amorph(true, 'boolean')
  this.alias = new Amorph('', 'ascii')
  this.currency = settings.currency
  this.base = settings.country
  this.minProductsTotal = new Pricemorph(ZERO, this.currency.to('ascii'))
  this.disputeSecondsOption = disputeSecondsOptions[1209600]
  this.affiliateFeeMicroperun = new Amorph(MICRO.pow(-1).times(0.03), 'bignumber')
  this.bufferMicroperun = new Amorph(MICRO.pow(-1).times(0.1), 'bignumber')
  this.products = []
  this.transports = []
  this.approvedArbitratorAliases = []
  this.addProduct()
  this.addTransport()
}

Store.prototype.setFromChainState = function setFromChainState() {
  const state = this.schema.state
  this.isOpen = state.isOpen.clone()
  console.log('state', state)
  this.currency = currencies[state.currency.to('ascii')]
  this.minProductsTotal = new Pricemorph(state.minProductsTotal, this.currency.to('ascii'))
  this.disputeSecondsOption = disputeSecondsOptions[state.disputeSeconds.to('number')]
  this.affiliateFeeMicroperun = state.affiliateFeeMicroperun.clone()
  this.bufferMicroperun = state.bufferMicroperun.clone()
  this.metaMultihash = state.metaMultihash.clone()
  this.approvedArbitratorAliases = []
  return Q.all([
    ipfsAmorphApi.getFile(this.metaMultihash).then((metaFile) => {
      this.meta = protobufferTypes.Store.decode(metaFile.to('buffer'))
      this.name = this.meta.name
      this.base = places.dictionary[this.meta.base]
      this.info = this.meta.info
      this.products = state.products.map((_state, index) => {
        return new StoreProduct(this, new Amorph(index, 'number'))
      })
      this.transports = state.transports.map((_state, index) => {
        return new StoreTransport(this, new Amorph(index, 'number'))
      })
    }),
    aliasReg.getAlias(this.address).then((alias) => {
      this.alias = alias
    })
  ])
}

Store.prototype.addProduct = function addProduct() {
  const storeProduct = new StoreProduct(this, null)
  storeProduct.isRemovable = true
  this.products.push(storeProduct)
}

Store.prototype.addTransport = function addTransport() {
  const storeTransport = new StoreTransport(this, null)
  storeTransport.isRemovable = true
  this.transports.push(storeTransport)
}

Store.prototype.addApprovedArbitratorAlias = function addApprovedArbitratorAlias() {
  this.approvedArbitratorAliases.push(new Amorph('', 'ascii'))
}

Store.prototype.getMeta = function getMeta() {
  return {
    name: this.name || '',
    base: this.base.code || '',
    info: this.info || '',
    products: this.products.map((product) => {
      return product.getMeta()
    }),
    transports: this.transports.map((transport) => {
      return transport.getMeta()
    })
  }
}

Store.prototype.getMetaMultihash = function getMetaMultihash() {
  return getUnixMultihash(this.getMetaFile())
}

Store.prototype.getLocalState = function getLocalState() {
  return {
    isOpen: this.isOpen.clone(),
    currency: this.currency.clone(),
    bufferMicroperun: this.bufferMicroperun.clone(),
    disputeSeconds: this.disputeSecondsOption.seconds.clone(),
    minProductsTotal: this.minProductsTotal.to(this.currency.to('ascii')).clone(),
    affiliateFeeMicroperun: this.affiliateFeeMicroperun.clone(),
    metaMultihash: this.getMetaMultihash(),
    products: this.products.map((product) => {
      return product.getStatePojo()
    }),
    transports: this.transports.map((transport) => {
      return transport.getStatePojo()
    })
    // uniqueArrays: {
    //   approvedArbitratorAlias: this.approvedArbitratorAliases
    // }
  }
}

Store.prototype.getMetaFile = function getMetaFile() {
  const meta = _.omit(this.getMeta(), _.isUndefined)
  const metaProto = protobufferTypes.Store.create(meta)
  const metaFileUint8Array = protobufferTypes.Store.encode(metaProto).finish()
  return new Amorph(metaFileUint8Array, 'uint8Array')
}

Store.prototype.getTransactionRequest = function getTransactionRequest() {
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
      method: 'setOwner(address,bool)',
      args: [
        solWrappers.OrderReg.address,
        new Amorph(true, 'boolean')
      ]
    })
    updates.push({
      method: 'set_bool(bytes32,bool)',
      args: [
        new Amorph('isStore', 'ascii'),
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

module.exports = Store

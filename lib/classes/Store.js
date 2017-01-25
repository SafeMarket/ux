const StoreProduct = require('./StoreProduct')
const StoreTransport = require('./StoreTransport')
const Pricemorph = require('./Pricemorph')
const Amorph = require('./Amorph')
const settingsManager = require('../settingsManager')
const disputeSecondsOptions = require('../disputeSecondsOptions')
const contracts = require('../contracts')
const Statesync = require('./Statesync')
const getUnixMultihash = require('../utils/getUnixMultihash')
const CENTI = require('../constants/CENTI')
const PICO = require('../constants/PICO')
const TERA = require('../constants/TERA')
const solWrappers = require('../solWrappers')
const SolWrapper = require('ultralightbeam/lib/SolWrapper')
const ultralightbeam = require('../ultralightbeam')
const places = require('../places')
const currencies = require('../currencies')
const NoUpdatesError = require('../errors/NoUpdates')
const ZERO = require('../constants/ZERO')
const protofile = require('../protofile')
const protobufjs = require('protobufjs')
const _ = require('lodash')
const ipfs = require('../ipfs')
const aliasReg = require('../aliasReg')
const Q = require('q')

const StoreType = protobufjs.parse(protofile.to('utf8')).root.lookup('safemarket.Store')

function Store(address) {
  if (!address) {
    this.statesync = new Statesync(contracts.Store.schema)
    this.setDefaults()
    return
  }
  this.address = address
  this.solWrapper = new SolWrapper(ultralightbeam, contracts.Store.abi, address)
  this.statesync = new Statesync(contracts.Store.schema, (methodAbi, args) => {
    return this.solWrapper.fetch(methodAbi, args)
  })

  this.download()
}

Store.prototype.download = function download() {
  this.isReady = false
  return this.statesync.download().then(() => {
    return this.setFromChainState().then(() => {
      this.isReady = true
    })
  })
}

Store.prototype.setDefaults = function setDefaults() {
  const settings = settingsManager.get()
  this.isOpen = new Amorph(true, 'boolean')
  this.currency = settings.currency
  this.base = settings.country
  this.minProductsTotal = new Pricemorph(ZERO, this.currency.to('ascii'))
  this.disputeSecondsOption = disputeSecondsOptions[1209600]
  this.affiliateFeeCentiperun = new Amorph(3.5, 'number')
  this.bufferCentiperun = new Amorph(10, 'number')
  this.products = []
  this.transports = []
  this.addProduct()
  this.addTransport()
  this.alias = new Amorph('', 'ascii')
}

Store.prototype.setFromChainState = function setFromChainState() {
  const variables = this.statesync.chainState.variables
  const structArrays = this.statesync.chainState.structArrays
  this.isOpen = variables.isOpen.clone()
  this.currency = currencies[variables.currency.to('ascii')]
  const minProductsTotalBignumber = variables.minProductsTeratotal.to('bignumber').div(TERA)
  const minProductsTotal = new Amorph(minProductsTotalBignumber, 'bignumber')
  this.minProductsTotal = new Pricemorph(minProductsTotal, this.currency.to('ascii'))
  this.disputeSecondsOption = disputeSecondsOptions[variables.disputeSeconds.to('number')]
  const affiliateFeeCentiperunBignumber = variables.affiliateFeePicoperun.to('bignumber').times(PICO).div(CENTI)
  this.affiliateFeeCentiperun = new Amorph(affiliateFeeCentiperunBignumber, 'bignumber')
  const bufferCentiperunBignumber = variables.bufferPicoperun.to('bignumber').times(PICO).div(CENTI)
  this.bufferCentiperun = new Amorph(bufferCentiperunBignumber, 'bignumber')

  return Q.all([
    ipfs.getFile(variables.metaMultihash).then((metaFile) => {
      this.meta = StoreType.decode(metaFile.to('buffer'))
      this.name = this.meta.name
      this.base = places.dictionary[this.meta.base]
      this.info = this.meta.info
      this.products = structArrays.Product.map((state, index) => {
        return new StoreProduct(this, index)
      })
      this.transports = structArrays.Transport.map((state, index) => {
        return new StoreTransport(this, index)
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
  const bufferPicoperunBignumber = this.bufferCentiperun.to('bignumber').times(CENTI).div(PICO)
  const bufferPicoperun = new Amorph(bufferPicoperunBignumber, 'bignumber')
  const affiliateFeePicoperunBignumber = this.affiliateFeeCentiperun.to('bignumber').times(CENTI).div(PICO)
  const affiliateFeePicoperun = new Amorph(affiliateFeePicoperunBignumber, 'bignumber')
  const minProductsTeratotalBignumber = this.minProductsTotal.to(this.currency.to('ascii')).to('bignumber').times(TERA)
  const minProductsTeratotal = new Amorph(minProductsTeratotalBignumber, 'bignumber')

  return {
    variables: {
      isOpen: this.isOpen,
      currency: this.currency,
      bufferPicoperun: bufferPicoperun,
      disputeSeconds: this.disputeSecondsOption.seconds,
      minProductsTeratotal: minProductsTeratotal,
      affiliateFeePicoperun: affiliateFeePicoperun,
      metaMultihash: this.getMetaMultihash()
    },
    structArrays: {
      Product: this.products.map((product) => {
        return product.getStatePojo()
      }),
      Transport: this.transports.map((transport) => {
        return transport.getStatePojo()
      })
    }
  }
}

Store.prototype.getMetaFile = function getMetaFile() {
  const meta = _.omit(this.getMeta(), _.isUndefined)
  const metaProto = StoreType.create(meta)
  const metaFileUint8Array = StoreType.encode(metaProto).finish()
  return new Amorph(metaFileUint8Array, 'uint8Array')
}

Store.prototype.getTransactionRequest = function getTransactionRequest() {
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
  console.log('updates', updates)

  updates.map((update) => {
    return solWrappers.Store.getCalldata(update.methodAbi, update.args)
  }).forEach((calldata) => {
    const _calldataArray = calldata.to('array')
    calldataArray.push(..._calldataArray)
    calldataLengths.push(new Amorph(_calldataArray.length, 'number'))
  })
  console.log('calldataArray', calldataArray)
  console.log('calldataLengths', calldataLengths)
  const calldata = new Amorph(calldataArray, 'array')
  if (!this.address) {
    return solWrappers.Multiprox.getTransactionRequest('createAndExecute(bytes32,uint256[],bytes)', [
      contracts.Store.codeHash,
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

module.exports = Store

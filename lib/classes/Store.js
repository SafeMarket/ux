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
const ipfs = require('../ipfs')
const places = require('../places')
const currencies = require('../currencies')
const NoUpdatesError = require('../errors/NoUpdates')
const ZERO = require('../constants/ZERO')

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
    console.log('statesynced', this.statesync)
    return this.setFromChainState().then(() => {
      this.isReady = true
    })
  }, (err) => {
    console.log(err)
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
}

Store.prototype.setFromChainState = function setDefaults() {
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

  return ipfs.getFile(variables.metaMultihash).then((metaFile) => {
    this.metaPojo = JSON.parse(metaFile.to('utf16le'))
    this.name = this.metaPojo.name
    this.base = places.dictionary[this.metaPojo.base]
    this.info = this.metaPojo.info
    this.products = structArrays.Product.map((state, index) => {
      return new StoreProduct(this, index)
    })
    this.transports = structArrays.Transport.map((state, index) => {
      return new StoreTransport(this, index)
    })
  })
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

Store.prototype.getMetaPojo = function getMetaPojo() {
  return {
    name: this.name,
    base: this.base.code,
    info: this.info,
    products: this.products.map((product) => {
      return product.getMetaPojo()
    }),
    transports: this.transports.map((transport) => {
      return transport.getMetaPojo()
    })
  }
}

Store.prototype.getMetaMultihash = function getMetaMultihash() {
  return getUnixMultihash(this.getMeta())
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

Store.prototype.getMeta = function getMeta() {
  return new Amorph(JSON.stringify(this.getMetaPojo()), 'utf16le')
}

Store.prototype.getTransactionRequest = function getTransactionRequest() {
  const calldataArray = []
  const calldataLengths = []
  const updates = this.statesync.getUpdates(this.getLocalState())

  if (updates.length === 0) {
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
  }

  updates.map((update) => {
    return solWrappers.Store.getCalldata(update.methodAbi, update.args)
  }).forEach((calldata) => {
    const _calldataArray = calldata.to('array')
    calldataArray.push(..._calldataArray)
    calldataLengths.push(new Amorph(_calldataArray.length, 'number'))
  })
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

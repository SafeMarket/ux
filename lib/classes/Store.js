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
const TERA = require('../constants/TERA')
const solWrappers = require('../solWrappers')

console.log(contracts.Store)

function Store(address) {

  this.address = address
  this.statesync = new Statesync(contracts.Store.schema)

  const settings = settingsManager.get()

  this.raw = {
    products: [],
    raw: []
  }

  this.isOpen = new Amorph(true, 'boolean')
  this.currency = settings.currency
  this.minProductsTotal = new Pricemorph(new Amorph(0, 'number'), this.currency.to('ascii'))
  this.disputeSeconds = disputeSecondsOptions[1209600].seconds
  this.affiliateFeeCentiperun = new Amorph(3.5, 'number')
  this.bufferCentiperun = new Amorph(150, 'number')
  this.products = []
  this.transports = []

  this.addProduct()
  this.addTransport()
}

Store.prototype.addProduct = function addProduct() {
  this.products.push(new StoreProduct(this))
}

Store.prototype.addTransport = function addTransport() {
  this.transports.push(new StoreTransport(this))
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

Store.prototype.getState = function getState() {
  const bufferTeraperunBignumber = this.bufferCentiperun.to('bignumber').div(CENTI).times(TERA)
  const bufferTeraperun = new Amorph(bufferTeraperunBignumber, 'bignumber')
  const affiliateFeeTeraperunBignumber = this.affiliateFeeCentiperun.to('bignumber').div(CENTI).times(TERA)
  const affiliateFeeTeraperun = new Amorph(affiliateFeeTeraperunBignumber, 'bignumber')
  const minProductsTeratotalBignumber = this.minProductsTotal.to(this.currency.to('ascii')).to('bignumber').div(CENTI).times(TERA)
  const minProductsTeratotal = new Amorph(minProductsTeratotalBignumber, 'bignumber')
  return {
    variables: {
      isOpen: this.isOpen,
      currency: this.currency,
      bufferTeraperun: bufferTeraperun,
      disputeSeconds: this.disputeSeconds,
      minProductsTeratotal: minProductsTeratotal,
      affiliateFeeTeraperun: affiliateFeeTeraperun,
      metaMultihash: this.getMetaMultihash()
    },
    structArrays: {
      Product: this.products.map((product) => {
        return product.getStatePojo()
      }),
      Transport: this.products.map((transport) => {
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
  const updates = this.statesync.getUpdates(this.getState())
  updates.map((update) => {
    return solWrappers.Store.getCalldata(update.methodAbi, update.args)
  }).forEach((calldata) => {
    const _calldataArray = calldata.to('array')
    calldataArray.push(..._calldataArray)
    calldataLengths.push(new Amorph(_calldataArray.length, 'number'))
  })
  const calldata = new Amorph(calldataArray, 'array')
  return solWrappers.Multiprox.getTransactionRequest('createAndExecute(bytes32,uint256[],bytes)', [
    contracts.Store.codeHash,
    calldataLengths,
    calldata
  ])
}

module.exports = Store

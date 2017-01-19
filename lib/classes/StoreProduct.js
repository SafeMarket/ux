const Amorph = require('./Amorph')
const Pricemorph = require('./Pricemorph')
const _ = require('lodash')
const TERA = require('../constants/TERA')
const ZERO = require('../constants/ZERO')

function StoreProduct(store, id) {
  this.store = store
  if (id === null) {
    this.setDefaults()
  } else {
    this.setFromChain(id)
  }
}

StoreProduct.prototype.setDefaults = function setDefaults() {
  this.isArchived = new Amorph(false, 'boolean')
  this.price = new Pricemorph(ZERO, this.store.currency.to('ascii'))
  this.isUnitsLimited = true
  this.units = ZERO
  this.imageHashes = []
}

StoreProduct.prototype.setFromChain = function setFromChain(id) {
  const chainState = this.store.statesync.chainState.structArrays.Product[id]
  this.isArchived = chainState.isArchived.clone()
  const priceBignumber = chainState.teraprice.to('bignumber').div(TERA)
  const price = new Amorph(priceBignumber, 'bignumber')
  this.price = new Pricemorph(price, this.store.currency.to('ascii'))
  this.isUnitsLimited = true
  this.units = chainState.units.clone()
  this.name = this.store.metaPojo.products[id].name
  this.info = this.store.metaPojo.products[id].info
  this.imageHashes = []
}

StoreProduct.prototype.remove = function remove() {
  _.remove(this.store.products, (products) => {
    return products === this
  })
}

StoreProduct.prototype.getMetaPojo = function getMetaPojo() {
  return {
    name: this.name,
    info: this.info
  }
}

StoreProduct.prototype.getStatePojo = function getStatePojo() {
  const terapriceBignumber = this.price.to(this.store.currency.to('ascii')).to('bignumber').times(TERA)
  return {
    isArchived: this.isArchived,
    teraprice: new Amorph(terapriceBignumber, 'bignumber'),
    units: this.units
  }
}

module.exports = StoreProduct

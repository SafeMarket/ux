const Amorph = require('./Amorph')
const Pricemorph = require('./Pricemorph')
const _ = require('lodash')
const TERA = require('../constants/TERA')

function StoreProduct(store) {
  this.store = store
  this.isArchived = new Amorph(false, 'boolean')
  this.price = new Pricemorph(new Amorph(0, 'number'), store.currency.to('ascii'))
  this.isUnitsLimited = true
  this.units = new Amorph(0, 'number')
  this.imageHashes = []
  this.isRemovable = store.products.length > 0
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

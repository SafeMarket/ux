const Amorph = require('./Amorph')
const Pricemorph = require('./Pricemorph')
const _ = require('lodash')
const TERA = require('../constants/TERA')

function StoreTransport(store) {
  this.store = store
  this.isArchived = new Amorph(false, 'boolean')
  this.price = new Pricemorph(new Amorph(0, 'number'), store.currency.to('ascii'))
  this.isGlobal = true
  this.to = store.base
  this.isRemovable = store.transports.length > 0
}

StoreTransport.prototype.remove = function remove() {
  _.remove(this.store.transports, (transport) => {
    return transport === this
  })
}

StoreTransport.prototype.getMetaPojo = function getMetaPojo() {
  return {
    name: this.name,
    info: this.info,
    isGolbal: this.isGlobal,
    to: this.to ? this.to.code : undefined
  }
}

StoreTransport.prototype.getStatePojo = function getStatePojo() {
  const terapriceBignumber = this.price.to(this.store.currency.to('ascii')).to('bignumber').times(TERA)
  return {
    isArchived: this.isArchived,
    teraprice: new Amorph(terapriceBignumber, 'bignumber')
  }
}

module.exports = StoreTransport

const Amorph = require('./Amorph')
const Pricemorph = require('./Pricemorph')
const _ = require('lodash')
const TERA = require('../constants/TERA')
const places = require('../places')
const settingsManager = require('../settingsManager')
const ZERO = require('../constants/ZERO')

function StoreTransport(store, id) {
  this.store = store
  if (id === null) {
    this.setDefaults()
  } else {
    this.setFromChain(id)
  }
}

StoreTransport.prototype.setDefaults = function setDefaults() {
  this.isArchived = new Amorph(false, 'boolean')
  this.price = new Pricemorph(ZERO, this.store.currency.to('ascii'))
  this.to = places.global
}

StoreTransport.prototype.setFromChain = function setFromChain(id) {
  const chainState = this.store.statesync.chainState.structArrays.Transport[id]
  const meta = this.store.meta.transports[id]
  this.isArchived = chainState.isArchived.clone()
  const priceBignumber = chainState.teraprice.to('bignumber').div(TERA)
  const price = new Amorph(priceBignumber, 'bignumber')
  this.price = new Pricemorph(price, this.store.currency.to('ascii'))
  this.name = meta.name
  this.info = meta.info
  this.to = places.dictionary[meta.to]
  this.imageMultihashes = []
}

StoreTransport.prototype.getLabel = function getLabel() {
  const currencyAscii = settingsManager.get().currency.to('ascii')
  const priceLabel = this.price.to(currencyAscii).to('bignumber').round(2).toString()
  return `${this.name} (${this.to.label}) - ${priceLabel} ${currencyAscii}`
}

StoreTransport.prototype.remove = function remove() {
  _.remove(this.store.transports, (transport) => {
    return transport === this
  })
}

StoreTransport.prototype.getMeta = function getMeta() {
  return {
    name: this.name || '',
    to: this.to ? this.to.code : '',
    info: this.info || '',
    imageMultihashes: this.imageMultihashes
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

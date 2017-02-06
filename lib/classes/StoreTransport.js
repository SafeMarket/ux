const Amorph = require('./Amorph')
const Pricemorph = require('./Pricemorph')
const _ = require('lodash')
const TERA = require('../constants/TERA')
const places = require('../places')
const settingsManager = require('../settingsManager')
const ZERO = require('../constants/ZERO')
const getPricemorphLabel = require('../utils/getPricemorphLabel')

function StoreTransport(store, id) {
  this.id = id
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
  const state = this.store.schema.state.transports[id.to('number')]
  const meta = this.store.meta.transports[id.to('number')]
  this.isArchived = state.isArchived.clone()
  this.price = new Pricemorph(state.price.clone(), this.store.currency.to('ascii'))
  this.name = meta.name
  this.to = places.dictionary[meta.to]
  this.info = meta.info
}

StoreTransport.prototype.getLabel = function getLabel() {
  return getPricemorphLabel(this.price)
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
  return {
    isArchived: this.isArchived.clone(),
    price: this.price.to(this.store.currency.to('ascii')).clone()
  }
}

module.exports = StoreTransport

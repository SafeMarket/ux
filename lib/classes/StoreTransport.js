const Pricemorph = require('./Pricemorph')
const getPricemorphLabel = require('../utils/getPricemorphLabel')

function StoreTransport(store, index, data) {
  this.store = store
  this.name = data.name
  this.to = data.to
  this.pricemorph = new Pricemorph(data.price, store.meta.value.currency.to('ascii'))
  this.info = data.info
  this.label = this.toLabel()
}

StoreTransport.prototype.toLabel = function toLabel() {
  const pricemorphLabel = getPricemorphLabel(this.pricemorph)
  return `${this.name.to('ascii')} (${pricemorphLabel})`
}

module.exports = StoreTransport

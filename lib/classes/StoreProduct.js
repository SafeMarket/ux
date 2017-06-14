const Pricemorph = require('./Pricemorph')

function StoreProduct(store, index, data) {
  this.store = store
  this.name = data.name
  this.pricemorph = new Pricemorph(data.price, store.meta.value.currency.to('ascii'))
  this.info = data.info
  this.imageMultihashes = data.imageMultihashes
  this.url = `${store.productsUrl}/${index}`
}

module.exports = StoreProduct

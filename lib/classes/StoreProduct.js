const Amorph = require('./Amorph')
const Pricemorph = require('./Pricemorph')
const _ = require('lodash')
const ZERO = require('../constants/ZERO')
const getUnixMultihash = require('../utils/getUnixMultihash')
const ipfsAmorphApi = require('../ipfsAmorphApi')

function StoreProduct(store, id) {
  this.id = id
  this.store = store
  if (id === null) {
    this.setDefaults()
  } else {
    this.setFromChain(id)
  }
  this.images = []
}

StoreProduct.prototype.setDefaults = function setDefaults() {
  this.isArchived = new Amorph(false, 'boolean')
  this.price = new Pricemorph(ZERO, this.store.currency.to('ascii'))
  this.isUnitsLimited = true
  this.quantity = ZERO
}

StoreProduct.prototype.setFromChain = function setFromChain(id) {
  const state = this.store.schema.state.products[id.to('number')]
  const meta = this.store.meta.products[id.to('number')]
  this.isArchived = state.isArchived.clone()
  this.price = new Pricemorph(state.price.clone(), this.store.currency.to('ascii'))
  this.quantity = state.quantity.clone()
  this.name = meta.name
  this.info = meta.info
  meta.imageMultihashes.forEach((imageMultihashUint8Array, imageIndex) => {
    const imageMultihash = new Amorph(imageMultihashUint8Array, 'uint8Array')
    ipfsAmorphApi.getFile(imageMultihash).then((image) => {
      this.images[imageIndex] = image
    })
  })
}

StoreProduct.prototype.remove = function remove() {
  _.remove(this.store.products, (products) => {
    return products === this
  })
}

StoreProduct.prototype.getMeta = function getMeta() {
  return {
    name: this.name || '',
    info: this.info || '',
    imageMultihashes: this.images.map((image) => {
      return getUnixMultihash(image).to('uint8Array')
    })
  }
}

StoreProduct.prototype.getStatePojo = function getStatePojo() {
  return {
    isArchived: this.isArchived.clone(),
    price: this.price.to(this.store.currency.to('ascii')).clone(),
    quantity: this.quantity.clone()
  }
}

module.exports = StoreProduct

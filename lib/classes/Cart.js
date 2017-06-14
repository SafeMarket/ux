/* globals confirm */

const arguguard = require('arguguard')
const Store = require('./Store')
const EventEmitter = require('events')
const _ = require('lodash')
const storeManager = require('../storeManager')
const Amorph = require('./Amorph')
const Q = require('q')
const Pricemorph = require('./Pricemorph')

function Cart() {
  arguguard('Cart', [], arguments)

  this.emitter = new EventEmitter()
  this.emitter.on('update', () => {
    console.log('update', this)
    localStorage.setItem('cart', JSON.stringify({
      quantities: this.quantities,
      storeIdHex: this.store.id.to('hex')
    }))
  })
  const cartJSON = localStorage.getItem('cart')
  const deferred = Q.defer()

  this.promise = deferred.promise
  this.quantities = {}

  if (cartJSON) {
    const cartPojo = JSON.parse(cartJSON)
    this.quantities = cartPojo.quantities
    const storeId = new Amorph(cartPojo.storeIdHex, 'hex')
    storeManager.get(storeId).then((store) => {
      this.store = store
      deferred.resolve()
    })
  } else {
    deferred.resolve()
  }
}

Cart.prototype.add = function add(store, productIndexNumber, quantityNumber) {
  arguguard('cart.add', ['Store', 'number', 'number'], arguments)
  if (!this.store) {
    this.store = store
    this.quantities = {}
  } else if (!this.store.id.equals(store.id)) {
    if (!confirm('Your cart has items from another store. Would you like to reset your cart?')) {
      return
    }
    this.store = store
    this.quantities = {}
  }
  if (this.quantities[productIndexNumber] === undefined) {
    this.quantities[productIndexNumber] = 0
  }
  this.quantities[productIndexNumber] += quantityNumber
  this.emitter.emit('update')
}

Cart.prototype.getTotalQuantityNumber = function getProductsCount() {
  arguguard('cart.getTotalQuantityNumber', [], arguments)
  let totalQuantityNumber = 0
  _.forEach(this.quantities, (quantityNumber) => {
    totalQuantityNumber += quantityNumber
  })
  return totalQuantityNumber
}

Cart.prototype.getTotalPricemorph = function getTotalPricemorph() {
  arguguard('cart.getTotalPricemorph', [], arguments)
  let pricemorph
  try {
    pricemorph = new Pricemorph(new Amorph(0, 'number'), 'WEI0')
    _.forEach(this.quantities, (quantityNumber, productIndexNumber) => {
      const product = this.store.products[productIndexNumber]
      console.log(product)
      pricemorph = pricemorph.plus(product.pricemorph.times(new Amorph(quantityNumber, 'number')))
    })
  } catch (err) {
    console.log(err)
  }

  return pricemorph
}

module.exports = Cart

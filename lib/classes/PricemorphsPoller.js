const Pricemorph = require('../classes/Pricemorph')
const pricesPoller = require('../pricesPoller')
const _ = require('lodash')
const EventEmitter = require('events')
const pricemorphPaths = require('../pricemorphPaths')
const Q = require('q')

function PricemorphsPoller() {
  this.pricemorphs = {}
  this.emitter = new EventEmitter()
  this.isReady = false

  let deferred = Q.defer()
  this.promise = deferred.promise

  pricesPoller.emitter.on('prices', (prices) => {
    const pricemorphs = {}
    this.isReady = false
    _.forEach(prices, (price, currencyAscii) => {
      const pricemorph = new Pricemorph(price, 'WEI')
      Pricemorph.loadPricemorph(pricemorph, currencyAscii)
      this.pricemorphs[currencyAscii] = pricemorphs[currencyAscii] = pricemorph
    })
    if (!_.isEmpty(pricemorphs)) {
      Pricemorph.ready({
        paths: pricemorphPaths
      })
      this.isReady = true
      this.emitter.emit('pricemorphs', pricemorphs)
      deferred.resolve(pricemorphs)
      deferred = Q.defer()
      this.promise = deferred.promise
    }
  })
}

module.exports = PricemorphsPoller

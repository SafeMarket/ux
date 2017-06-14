const pricemorphZone = require('../pricemorphZone')
const pricesPoller = require('../pricesPoller')
const _ = require('lodash')
const EventEmitter = require('events')
const Q = require('q')

function PricemorphsPoller() {
  this.emitter = new EventEmitter()
  this.isReady = false

  let deferred = Q.defer()
  this.promise = deferred.promise

  pricesPoller.emitter.on('prices', (prices) => {

    this.isReady = false
    let isUpdated = false
    _.forEach(prices, (price, currencyAscii) => {
      const currentRate = pricemorphZone.rates[currencyAscii]
      if (!currentRate || !currentRate.equals(price)) {
        pricemorphZone.setRate(currencyAscii, price)
        console.log(pricemorphZone)
        isUpdated = true
      }
    })
    if (isUpdated === true) {
      this.isReady = true
      this.emitter.emit('update')
      deferred.resolve()
      deferred = Q.defer()
      this.promise = deferred.promise
    }
  })
}

module.exports = PricemorphsPoller

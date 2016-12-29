const Pricemorph = require('pricemorph')
const pricesPoller = require('../pricesPoller')
const _ = require('lodash')
const EventEmitter = require('events')
const pricemorphPaths = require('../pricemorphPaths')

function PricemorphsPoller() {
  this.pricemorphs = {}
  this.emitter = new EventEmitter()
  this.isReady = false

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
    }
  })
}

module.exports = PricemorphsPoller

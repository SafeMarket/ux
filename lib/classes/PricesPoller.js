const _ = require('lodash')
const ultralightbeam = require('../ultralightbeam')
const ticker = require('../ticker')
const EventEmitter = require('events')

function PricesPoller() {
  this.prices = {}
  this.emitter = new EventEmitter()

  ultralightbeam.blockPoller.emitter.on('block', () => {
    ticker.getPrices().then((prices) => {

      const _prices = {}

      _.forEach(prices, (price, currencyAscii) => {

        if ( // price exists and has not been updated
          this.prices[currencyAscii] &&
          this.prices[currencyAscii].amorphEquals(price)
        ) {
          return
        }

        this.prices[currencyAscii] = _prices[currencyAscii] = price
      })

      if (!_.isEmpty(_prices)) {
        this.emitter.emit('prices', _prices)
      }

    })
  })
}

module.exports = PricesPoller

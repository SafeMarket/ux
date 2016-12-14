const ultralightbeam = require('../ultralightbeam')
const contracts = require('../contracts')
const currencies = require('../currencies')
const Q = require('q')

function Ticker(address) {
  this.address = address
  this.prices = []

  const pollPrices = () => {
    console.log('pollPrices')
    ultralightbeam.blockPoller.promise.then(() => {
      this.updatePrices().then(pollPrices)
    })
  }
  pollPrices()
}

Ticker.prototype.getPrice = function getPrice(currency) {
  return contracts.Ticker.solbuilder.get(
    this.address,
    'getPrice(bytes4)',
    [currency]
  )
}

Ticker.prototype.getPrices = function getPrices() {
  const prices = {}
  const promises = currencies.map((currency) => {
    return this.getPromise(currency).then((price) => {
      prices[currency.to('ascii')] = price
    })
  })
  return Q.all(promises).then(() => {
    return prices
  })
}

Ticker.prototype.updatePrices = function updatePrices() {
  return this.getPrices().then((prices) => {
    this.prices = prices
  })
}

module.exports = Ticker

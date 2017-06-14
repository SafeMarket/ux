const ultralightbeam = require('../ultralightbeam')
const SolWrapper = require('ultralightbeam/lib/SolWrapper')
const contracts = require('../contracts')
const currencies = require('../currencies')
const Q = require('q')
const _ = require('lodash')
const arguguard = require('arguguard')
const environment = require('../environment')

function Ticker(address) {
  arguguard('Ticker', ['Amorph'], arguments)
  this.address = address
  this.solWrapper = new SolWrapper(ultralightbeam, contracts.OrderReg.abi, address)
}

Ticker.prototype.getPrice = function getPrice(priceSetter, currency) {
  arguguard('ticker.getPrice', ['Amorph', 'Amorph'], arguments)
  return this.solWrapper.fetch('prices(address,bytes4)', [priceSetter, currency])
}

Ticker.prototype.getPrices = function getPrices() {
  arguguard('ticker.getPrices', [], arguments)
  const prices = {}
  const promises = _.map(currencies, (currency) => {
    return this.getPrice(environment.priceSetter, currency).then((price) => {
      prices[currency.to('ascii')] = price
    })
  })
  return Q.all(promises).then(() => {
    return prices
  })
}

module.exports = Ticker

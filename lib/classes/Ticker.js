const ultralightbeam = require('../ultralightbeam')
const SolWrapper = require('ultralightbeam/lib/SolWrapper')
const contracts = require('safemarket-protocol/modules/contracts')
const currencies = require('../currencies')
const Q = require('q')
const _ = require('lodash')

function Ticker(address) {
  this.address = address
  this.solWrapper = new SolWrapper(ultralightbeam, contracts.Ticker.abi, address)
}

Ticker.prototype.getPrice = function getPrice(currency) {
  return this.solWrapper.fetch('prices(bytes32)', [currency])
}

Ticker.prototype.getPrices = function getPrices() {
  const prices = {}
  const promises = _.map(currencies, (currency) => {
    return this.getPrice(currency).then((price) => {
      prices[currency.to('ascii')] = price
    })
  })
  return Q.all(promises).then(() => {
    return prices
  })
}

module.exports = Ticker

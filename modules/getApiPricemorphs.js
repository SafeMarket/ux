const Amorph = require('../lib/classes/Amorph')
const Pricemorph = require('../lib/classes/Pricemorph')
const _ = require('lodash')
const Q = require('q')
const getJson = require('./getJson')
const Bignumber = require('bignumber.js')
const MICRO = require('../lib/constants/MICRO')

module.exports = function getApiPricemorphs() {
  console.log('')
  const pricemorphs = {
    WEI: new Pricemorph(new Amorph('.000000000000000001', 'number.string'), 'ETH')
  }

  const cmcPromise = getCmcPricemorphs().then((_pricemorphs) => {
    _.merge(pricemorphs, _pricemorphs)
  })
  const fixerPromise = getFixerPricemorphs().then((_pricemorphs) => {
    _.merge(pricemorphs, _pricemorphs)
  })
  return Q.all([cmcPromise, fixerPromise]).then(() => {
    return pricemorphs
  })

}

function getCmcPricemorphs() {
  console.log('Fetch coinmarketcap.com')
  return getJson('https://api.coinmarketcap.com/v1/ticker/').then((rates) => {
    const symbols = ['BTC', 'ETH']
    const pricemorphs = {}
    rates.forEach((rate) => {
      if (symbols.indexOf(rate.symbol) === -1) {
        return
      }
      const rateUsdNumberString = rate.price_usd
      const rateMicroUsd = new Amorph(rateUsdNumberString, 'number.string').as('bignumber', (bignumber) => {
        return bignumber.div(MICRO).floor()
      })
      pricemorphs[rate.symbol] = new Pricemorph(rateMicroUsd, '6USD')
    })
    return pricemorphs
  })
}

function getFixerPricemorphs() {
  console.log('Fetch fixer.io')
  return getJson('http://api.fixer.io/latest').then((data) => {
    const pricemorphs = {}
    _.forEach(data.rates, (rateNumber, symbol) => {
      const rateBigumber = new Bignumber(1).div(rateNumber)
      const rate = new Amorph(rateBigumber, 'number').as('bignumber', (bignumber) => {
        return bignumber.div(MICRO).floor()
      })
      pricemorphs[`6${symbol}`] = new Pricemorph(rate, data.base)
    })
    return pricemorphs
  })
}

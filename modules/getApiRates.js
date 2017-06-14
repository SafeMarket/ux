const Amorph = require('../lib/classes/Amorph')
const Pricemorph = require('../lib/classes/Pricemorph')
const _ = require('lodash')
const Q = require('q')
const getJson = require('./getJson')
const Bignumber = require('bignumber.js')
const MICRO = require('../lib/constants/MICRO')

module.exports = function getApiRates() {
  const rates = {
    ETH0: new Amorph('1000000000000000000', 'number.string')
  }

  const cmcPromise = getCmcRates().then((_rates) => {
    _.merge(rates, _rates)
  })
  const fixerPromise = getFixerRates().then((_rates) => {
    _.merge(rates, _rates)
  })
  return Q.all([cmcPromise, fixerPromise]).then(() => {
    return rates
  }).catch((err) => {
    console.log(err)
    process.exit()
  })

}

function getCmcRates() {
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
        return bignumber.div(MICRO.to('bignumber')).floor()
      })
      console.log(`${rate.symbol}0`, 'USD6')
      pricemorphs[`${rate.symbol}0`] = new Pricemorph(rateMicroUsd, 'USD6')
    })
    return pricemorphs
  })
}

function getFixerRates() {
  console.log('Fetch fixer.io')
  return getJson('http://api.fixer.io/latest').then((data) => {
    const pricemorphs = {}
    _.forEach(data.rates, (rateNumber, symbol) => {
      const rateBigumber = new Bignumber(1).div(rateNumber)
      const rate = new Amorph(rateBigumber, 'number').as('bignumber', (bignumber) => {
        return bignumber.div(MICRO.to('bignumber')).floor()
      })
      console.log(`${symbol}6`, `${data.base}0`)
      pricemorphs[`${symbol}6`] = new Pricemorph(rate, `${data.base}0`)
    })
    return pricemorphs
  })
}

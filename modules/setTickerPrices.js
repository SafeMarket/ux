const contracts = require('../lib/contracts')
const ultralightbeam = require('../lib/ultralightbeam')
const Q = require('q')
const getApiPricemorphs = require('./getApiPricemorphs')
const Pricemorph = require('pricemorph')
const Amorph = require('../lib/classes/Amorph')
const SolWrapper = require('ultralightbeam/lib/SolWrapper')
const _ = require('lodash')

const one = new Amorph(1, 'number')

module.exports = function setTickerPrices(tickerAddress) {

  const solWrapper = new SolWrapper(
    ultralightbeam,
    contracts.Ticker.abi,
    tickerAddress
  )

  return getApiPricemorphs().then((pricemorphs) => {
    console.log('Load pricemorphs')
    _.forEach(pricemorphs, (pricemorph, currencyAscii) => {
      Pricemorph.loadPricemorph(pricemorph, currencyAscii)
    })
    console.log('Start readying')
    Pricemorph.ready()
    console.log('Ready complete')
    const promises = Pricemorph.forms.map((currencyAscii) => {
      const pricemorph = new Pricemorph(one, currencyAscii)
      const weiPrice = pricemorph.to('WEI')
      console.log(`1 ${currencyAscii} = ${weiPrice.to('number')} WEI`)
      return solWrapper.set(
        'setPrice(bytes4,uint256)',
        [new Amorph(currencyAscii, 'ascii'), weiPrice]
      )
    })
    return Q.all(promises)
  })
}

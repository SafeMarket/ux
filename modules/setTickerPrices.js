const Q = require('q')
const getApiPricemorphs = require('./getApiPricemorphs')
const Pricemorph = require('../lib/classes/Pricemorph')
const Amorph = require('../lib/classes/Amorph')
const solwrappers = require('../lib/solWrappers')
const _ = require('lodash')

const one = new Amorph(1, 'number')

getApiPricemorphs().then((pricemorphs) => {
  console.log('Load pricemorphs')
  _.forEach(pricemorphs, (pricemorph, currencyAscii) => {
    Pricemorph.loadPricemorph(pricemorph, currencyAscii)
  })
  console.log('Start readying')
  Pricemorph.ready({
    formPairsSort: (formPairA, formPairB) => {
      if (formPairA.indexOf('BTC') >= 0) {
        return 1
      }
      if (formPairA.indexOf('ETH') >= 0) {
        return 1
      }
      if (formPairA.indexOf('WEI') >= 0) {
        return 1
      }
      return 0
    }
  })
  console.log('Ready complete')
  const promises = Pricemorph.forms.map((currencyAscii) => {
    const pricemorph = new Pricemorph(one, currencyAscii)
    const weiPrice = pricemorph.to('WEI')
    console.log(`1 ${currencyAscii} = ${weiPrice.to('number')} WEI`)
    return solwrappers.Ticker.broadcast(
      'setPrice(bytes32,uint256)',
      [new Amorph(currencyAscii, 'ascii'), weiPrice]
    ).getConfirmation()
  })
  return Q.all(promises).then(() => {
    console.log('Done writing Ticker prices'.green)
    process.exit()
  })
})

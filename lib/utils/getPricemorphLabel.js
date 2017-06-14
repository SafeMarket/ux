const settingsManager = require('../settingsManager')
const MICRO = require('../constants/MICRO')

module.exports = function getPricemorphLabel(pricemorph, _currency) {
  const currency = _currency || settingsManager.get().currency
  const currencyAscii = currency.to('ascii')
  const priceBignumber = pricemorph.to(currencyAscii).to('bignumber')
  console.log('pb', priceBignumber.toString())
  console.log('micro', MICRO.to('number.string'))
  if (currencyAscii[3] === '6') {
    return `${priceBignumber.times(MICRO.to('number.string')).round(2)} ${currencyAscii.substr(0, 3)}`
  }
  return `${priceBignumber.round(2)} ${currencyAscii}`
}

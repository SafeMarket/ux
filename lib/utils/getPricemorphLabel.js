const settingsManager = require('../settingsManager')
const MICRO = require('../constants/MICRO')

module.exports = function getPricemorphLabel(pricemorph, _currency) {
  const currency = _currency || settingsManager.get().currency
  const currencyAscii = currency.to('ascii')
  const priceBignumber = pricemorph.to(currencyAscii).to('bignumber')
  if (currencyAscii[0] === '6') {
    return `${priceBignumber.times(MICRO).round(2)} ${currencyAscii.substr(1)}`
  }
  return `${priceBignumber.round(2)} ${currencyAscii}`
}

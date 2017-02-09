const BigNumber = require('bignumber.js')

module.exports = function getPerunLabel(amorph, power) {
  const multiplier = new BigNumber(10).pow(power + 2)
  return `${amorph.to('bignumber').times(multiplier).round(2)}%`
}

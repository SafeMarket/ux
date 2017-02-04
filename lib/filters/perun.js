const BigNumber = require('bignumber.js')

module.exports = function perunFilter() {
  return function perunFilterFunction(amorph, power) {
    if (!amorph) {
      return
    }
    const multiplier = new BigNumber(10).pow(power + 2)
    return `${amorph.to('bignumber').times(multiplier)}%`
  }
}

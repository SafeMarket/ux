const getPerunLabel = require('../utils/getPerunLabel')

module.exports = function perunFilter() {
  return function perunFilterFunction(amorph, power) {
    if (!amorph) {
      return
    }
    return getPerunLabel(amorph, power)
  }
}

const Arbitrator = require('../classes/Arbitrator')
const Q = require('q')
const ArbitratorOption = require('../classes/ArbitratorOption')

module.exports = function getArbitratorOptions(store) {
  const arbitratorOptions = [new ArbitratorOption(null)]
  return Q.all(store.approvedArbitrators.map((address) => {
    console.log('address', address)
    const arbitrator = new Arbitrator(address)
    return arbitrator.promise.then(() => {
      return arbitrator
    })
  })).then((_arbitrators) => {
    console.log('_arbitrators', _arbitrators)
    const arbitrators = _arbitrators.filter((arbitrator) => {
      if (!arbitrator.isOpen.to('boolean')) {
        return false
      }
      return true
    })
    return arbitratorOptions.concat(arbitrators.map((arbitrator, index) => {
      return new ArbitratorOption(arbitrator, index)
    }))
  })
}

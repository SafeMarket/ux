const aliasReg = require('../aliasReg')
const Arbitrator = require('../classes/Arbitrator')
const Q = require('q')
const ArbitratorOption = require('../classes/ArbitratorOption')

module.exports = function getArbitratorOptions(store) {
  const arbitratorOptions = [new ArbitratorOption(null)]
  return Q.all(store.approvedArbitratorAliases.map((alias) => {
    return aliasReg.getOwner(alias)
  })).then((owners) => {
    return owners.filter((owner) => {
      return owner.to('bignumber').gt(0)
    })
  }).then((owners) => {
    return Q.all(owners.map((owner) => {
      const arbitrator = new Arbitrator(owner)
      return arbitrator.promise
    }))
  }).then((_arbitrators) => {
    const arbitrators = _arbitrators.filter((arbitrator) => {
      if (!arbitrator.isOpen.to('boolean')) {
        return false
      }
      return true
    })
    return arbitratorOptions.concat(arbitrators.map((arbitrator) => {
      return new ArbitratorOption(arbitrator)
    }))
  })
}

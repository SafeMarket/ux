const ultralightbeam = require('../ultralightbeam')
const SolWrapper = require('ultralightbeam/lib/SolWrapper')
const contracts = require('safemarket-protocol/modules/contracts')

function AliasReg(address) {
  this.address = address
  this.solWrapper = new SolWrapper(ultralightbeam, contracts.AliasReg.abi, address)
}

AliasReg.prototype.getOwner = function getOwner(alias) {
  return this.solWrapper.fetch('owners(bytes32)', [alias])
}
AliasReg.prototype.getAlias = function getAlias(owner) {
  return this.solWrapper.fetch('aliases(address)', [owner])
}

AliasReg.prototype.getIsAvailable = function getIsAvailable(alias) {
  return this.getOwner(alias).then((owner) => {
    return owner.to('bignumber').equals(0)
  })
}

AliasReg.prototype.unregister = function unregister() {
  return this.solWrapper.broadcast('unregister()', [])
}

module.exports = AliasReg

const solWrappers = require('../solWrappers')

module.exports = function getAddressForAlias(alias) {
  return solWrappers.AliasReg.fetch(
    'getOwner(bytes32)',
    [alias]
  ).then((owner) => {
    if (owner.to('number') === 0) {
      return null
    }
    return owner
  })
}

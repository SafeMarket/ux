const solWrappers = require('../solWrappers')

module.exports = function getAddressForAlias(address) {
  return solWrappers.AliasReg.fetch(
    'aliases(address)',
    [address]
  ).then((alias) => {
    if (alias.to('number') === 0) {
      return null
    }
    return alias
  })
}

const solWrappers = require('../solWrappers')

module.exports = function getAddressForAlias(alias) {
  return solWrappers.AliasReg.get(
    'getAddr(bytes32)',
    [alias]
  ).then((address) => {
    if (address.to('number') === 0) {
      return null
    }
    return address
  })
}

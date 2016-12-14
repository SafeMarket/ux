const ultralightbeam = require('../ultralightbeam')
const contracts = require('../contracts')

module.exports = function getAddressForAlias(alias) {
  const manifest = contracts.AliasReg.solbuilder.get(
    contracts.AliasReg.address,
    'getAddr(bytes32)',
    [alias]
  )
  return ultralightbeam.add(manifest).then((address) => {
    if (address.to('number') === 0) {
      return null
    }
    return address
  })
}

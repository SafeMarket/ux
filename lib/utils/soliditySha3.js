const _soliditySha3 = require('solidity-sha3')
const Amorph = require('../classes/Amorph')

module.exports = function soliditySha3(prehash) {
  const hashHexPrefixed = _soliditySha3.default(prehash.to('hex.prefixed'))
  return new Amorph(hashHexPrefixed, 'hex.prefixed')
}

const contracts = require('safemarket-protocol/modules/contracts')
const solWrappers = require('../solWrappers')
const _ = require('lodash')

module.exports = function getContractAtAddress(address) {
  solWrappers.Multiprox.fetch('getCodeHash(address)', [address]).then((codeHash) => {
    const codeHashBuffer = codeHash.to('buffer')
    return _.find(contracts, (_contract) => {
      return codeHashBuffer.equals(_contract.codeHash.to('buffer'))
    })
  })
}

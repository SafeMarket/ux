const SolWrapper = require('ultralightbeam/lib/SolWrapper')
const ultralightbeam = require('../ultralightbeam')
const contracts = require('safemarket-protocol/modules/contracts')

module.exports = function getIsOwner(contractAddress, userAddress) {
  const solWrapper = new SolWrapper(ultralightbeam, contracts.owned.abi, contractAddress)
  return solWrapper.fetch('isOwner(address)', [userAddress]).then((isOwner) => {
    return isOwner.to('boolean')
  })
}

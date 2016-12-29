const _ = require('lodash')
const fs = require('fs')

module.exports = function generateContractAddressesHex(contractAddresses) {
  const path = 'generated/contractAddressesHex/dev.gs'
  const contractAddressesPojo = {}
  _.forEach(contractAddresses, (contractAddress, contractName) => {
    contractAddressesPojo[contractName] = contractAddress.to('hex')
  })
  const contractAddresesHexJson = JSON.stringify(contractAddressesPojo, null, 2)
  fs.writeFileSync(path, `module.exports = ${contractAddresesHexJson}`)
  console.log(`Wrote ${Object.keys(contractAddresses).join(', ')} to ${path}`.green)
}

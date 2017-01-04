const environment = require('./environment')
const ultralightbeam = require('./ultralightbeam')
const contracts = require('./contracts')
const _ = require('lodash')
const SolWrapper = require('ultralightbeam/lib/SolWrapper')

const solWrappers = {}

_.forEach(environment.contractAddresses, (contractAddress, contractName) => {
  solWrappers[contractName] = new SolWrapper(
    ultralightbeam, contracts[contractName].abi, contractAddress
  )
})

module.exports = solWrappers

const environment = require('./environment')
const ultralightbeam = require('./ultralightbeam')
const contracts = require('safemarket-protocol/modules/contracts')
const _ = require('lodash')
const SolWrapper = require('ultralightbeam/lib/SolWrapper')

const solWrappers = {}

_.forEach(contracts, (contract, contractName) => {
  solWrappers[contractName] = new SolWrapper(
    ultralightbeam, contract.abi, environment.contractAddresses[contractName]
  )
})

module.exports = solWrappers

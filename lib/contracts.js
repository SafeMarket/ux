const _contracts = require('safemarket-protocol/generated/contracts.json')
const schemas = require('safemarket-protocol/modules/schemas')
const _ = require('lodash')
const Amorph = require('./classes/Amorph')
const soliditySha3 = require('./utils/soliditySha3')

const contracts = {}

_.forEach(_contracts.contracts, (_contract, contractName) => {
  const contract = contracts[contractName] = {
    name: contractName,
    bytecode: new Amorph(_contract.bytecode, 'hex'),
    runtimeBytecode: new Amorph(_contract.runtimeBytecode, 'hex'),
    abi: JSON.parse(_contract.interface),
    sol: _contract.solidityInterface,
    schema: schemas[contractName]
  }
  contract.codeHash = soliditySha3(contract.bytecode)
})

module.exports = contracts

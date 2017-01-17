const _contracts = require('safemarket-protocol/generated/contracts.json')
const schemas = require('safemarket-protocol/modules/schemas')
const _ = require('lodash')
const Amorph = require('./classes/Amorph')
const soliditySha3 = require('solidity-sha3')

const contracts = {}

_.forEach(_contracts.contracts, (_contract, contractName) => {
  contracts[contractName] = {
    bytecode: new Amorph(_contract.bytecode, 'hex'),
    runtimeBytecode: new Amorph(_contract.runtimeBytecode, 'hex'),
    abi: JSON.parse(_contract.interface),
    sol: _contract.solidityInterface,
    schema: schemas[contractName],
    codeHash: new Amorph(soliditySha3.default(`0x${_contract.bytecode}`), 'hex.prefixed')
  }
})

module.exports = contracts

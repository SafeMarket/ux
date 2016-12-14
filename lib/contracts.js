const _contracts = require('safemarket-protocol/generated/contracts.json')
const _ = require('lodash')
const Amorph = require('./Amorph')
const Solbuilder = require('ultralightbeam/lib/Solbuilder')

const contracts = {}

_.forEach(_contracts.contracts, (_contract, contractName) => {

  const contract = contracts[contractName] = {
    bytecode: new Amorph(_contract.bytecode, 'hex'),
    runtimeBytecode: new Amorph(_contract.runtimeBytecode, 'hex'),
    abi: JSON.parse(_contract.interface),
    sol: _contract.solidityInterface
  }

  contract.solbuilder = new Solbuilder(contract.abi, contract.bytecode)

})

contracts.AliasReg.address = new Amorph(
  'd84842c508ea44b83b2fefb93ff210917d954c68',
  'hex'
)

module.exports = contracts

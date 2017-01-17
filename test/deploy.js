const deploy = require('../modules/deploy')
const _ = require('lodash')
const contracts = require('../lib/contracts')
const Q = require('q')
const ultralightbeam = require('./ultralightbeam')
const blockFlags = require('ultralightbeam/lib/blockFlags')

const contractAddresses = {}

describe('deploy', () => {
  it('should be fulfilled', () => {
    return deploy().then((_contractAddresses) => {
      _.merge(contractAddresses, _contractAddresses)
    }).should.be.fulfilled
  })

  it('should have correct runtimeBytecodes', () => {
    const promises = _.map(contractAddresses, (contractAddress, contractName) => {
      return ultralightbeam.eth.getCode(contractAddress, blockFlags.latest).should.eventually.amorphEqual(
        contracts[contractName].runtimeBytecode, 'hex'
      )
    })
    return Q.all(promises)
  })
})

module.exports = contractAddresses

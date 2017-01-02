const contracts = require('../lib/contracts')
const ultralightbeam = require('../lib/ultralightbeam')
const SolDeployTransactionRequest = require('ultralightbeam/lib/SolDeployTransactionRequest')
const Q = require('q')

const contractNames = ['Ticker', 'AliasReg']


module.exports = function deploy() {
  const contractAddresses = {}
  const deployments = []
  contractNames.forEach((contractName) => {
    console.log(`Deploying ${contractName}`)
    const transactionRequest = new SolDeployTransactionRequest(
      contracts[contractName].bytecode,
      contracts[contractName].abi,
      []
    )
    const deployment = ultralightbeam.sendTransaction(
      transactionRequest
    ).getTransactionReceipt().then((
      transactionReceipt
    ) => {
      const contractAddress = transactionReceipt.contractAddress
      console.log(`Deployed ${contractName} to ${contractAddress.to('hex')}`)
      contractAddresses[contractName] = contractAddress
    })
    deployments.push(deployment)
  })
  return Q.all(deployments).then(() => {
    return contractAddresses
  })
}

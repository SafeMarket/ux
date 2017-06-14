const contracts = require('../lib/contracts')
const ultralightbeam = require('../lib/ultralightbeam')
const SolDeployTransactionRequest = require('ultralightbeam/lib/SolDeployTransactionRequest')
const generateContractAddressesHex = require('./generators/contractAddressesHex')
const Q = require('q')
const setup = require('./setup')

const contractNames = ['OrderReg', 'Planetoid', 'StoreReg']

const contractAddresses = {}
const deployments = []
contractNames.forEach((contractName) => {
  console.log(`Deploying ${contractName}...`)
  const transactionRequest = new SolDeployTransactionRequest(
    ultralightbeam,
    contracts[contractName].code,
    contracts[contractName].abi,
    [], {}
  )
  const deployment = transactionRequest.send().getContractAddress().then((contractAddress) => {
    console.log(`Deployed ${contractName} to ${contractAddress.to('hex')}`)
    contractAddresses[contractName] = contractAddress
  })
  deployments.push(deployment)
})
Q.all(deployments).then(() => {
  return generateContractAddressesHex(contractAddresses)
}).then(() => {
  return setup(contractAddresses)
}).then(() => {
  process.exit()
})

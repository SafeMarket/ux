const Ultralightbeam = require('ultralightbeam')
const HttpProvider = require('web3/lib/web3/httpprovider')
const environment = require('./environment')

const httpProvider = new HttpProvider('http://localhost:8545')
const ultralightbeam = new Ultralightbeam(httpProvider, {
  blockPollerInterval: 4000,
  transactionApprover: (transactionRequest, gas) => {
    transactionRequest.set('from', environment.profiles[0].persona)
    transactionRequest.set('gas', gas)
    return ultralightbeam.resolve(transactionRequest)
  }
})

module.exports = ultralightbeam

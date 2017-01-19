const Ultralightbeam = require('ultralightbeam')
const HttpProvider = require('web3/lib/web3/httpprovider')
const environment = require('./environment')

const persona = environment.profiles[0].persona

const httpProvider = new HttpProvider('http://localhost:8545')
const ultralightbeam = new Ultralightbeam(httpProvider, {
  blockPollerInterval: 4000,
  transactionApprover: (transactionRequest, gas) => {
    transactionRequest.set('from', persona)
    transactionRequest.set('gas', gas)
    return ultralightbeam.eth.getTransactionCount(persona.address).then((transactionCount) => {
      transactionRequest.set('nonce', transactionCount)
      return transactionRequest
    })
  }
})

module.exports = ultralightbeam

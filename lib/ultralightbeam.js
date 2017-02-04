const Ultralightbeam = require('ultralightbeam')
const HttpProvider = require('web3/lib/web3/httpprovider')
const environment = require('./environment')
const Amorph = require('../lib/classes/Amorph')

const persona = environment.profiles[0].persona

const httpProvider = new HttpProvider('http://localhost:8545')
const ultralightbeam = new Ultralightbeam(httpProvider, {
  blockPollerInterval: 4000,
  transactionHook: (transactionRequest) => {
    transactionRequest.set('from', persona)
    return ultralightbeam.eth.getTransactionCount(persona.address).then((transactionCount) => {
      transactionRequest.set('nonce', transactionCount)
      return ultralightbeam.eth.estimateGas(transactionRequest).then((gas) => {
        transactionRequest.set('gas', gas.as('bignumber', (bignumber) => {
          console.log('gas', bignumber.toNumber())
          return bignumber.times(1.5).floor()
        }))
        return transactionRequest
      })
    })
  }
})

module.exports = ultralightbeam

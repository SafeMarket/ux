const Ultralightbeam = require('ultralightbeam')
const HttpProvider = require('web3/lib/web3/httpprovider')
const environment = require('./environment')
const Amorph = require('../lib/classes/Amorph')
const Q = require('q')

const persona = environment.profiles[0].persona
console.log(`Using ${persona.address.to('hex.prefixed')} as default account`)

let nonce0
let nonceX = 0

function getNonce(address) {

  if (nonce0 instanceof Amorph) {
    const nonce = nonce0.as('number', (number) => {
      return number + nonceX
    })
    nonceX += 1
    return Q.resolve(nonce)
  }

  return ultralightbeam.eth.getTransactionCount(address).then((_nonce0) => {
    if (!(nonce0 instanceof Amorph)) {
      nonce0 = _nonce0
    }
    return getNonce()
  })
}

const httpProvider = new HttpProvider('http://104.236.86.146:8545')
const ultralightbeam = new Ultralightbeam(httpProvider, {
  maxBlocksToWait: 10,
  blockPollerInterval: 4000,
  transactionHook: (transactionRequest) => {
    transactionRequest.set('from', persona)
    return getNonce(persona.address).then((nonce) => {
      console.log('nonce', nonce.to('number'))
      transactionRequest.set('nonce', nonce)
      return ultralightbeam.eth.estimateGas(transactionRequest).then((gas) => {
        transactionRequest.set('gas', gas.as('bignumber', (bignumber) => {
          console.log('gas', bignumber.toNumber())
          return bignumber.times(1.5).floor()
        }))
        if (ultralightbeam.blockPoller.gasPrice) {
          transactionRequest.set('gasPrice', ultralightbeam.blockPoller.gasPrice)
          return transactionRequest
        }
        return ultralightbeam.blockPoller.gasPricePromise.then((gasPrice) => {
          transactionRequest.set('gasPrice', gasPrice)
          return transactionRequest
        })
      })
    })
  }
})

module.exports = ultralightbeam

const Ultralightbeam = require('ultralightbeam')
const HttpProvider = require('web3/lib/web3/httpprovider')
const environment = require('./environment')
const Amorph = require('./classes/Amorph')
const Q = require('q')

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

const httpProvider = new HttpProvider('http://localhost:8545')
const ultralightbeam = new Ultralightbeam(httpProvider, Amorph, {
  maxBlocksToWait: 10,
  blockPollerInterval: 2000,
  executionDebounce: 500,
  defaultAccount: environment.profile.account,
  gasCostHook: (gasCost) => {
    return Q.resolve()
  }
})

module.exports = ultralightbeam

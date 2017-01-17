const contracts = require('../lib/contracts')
const ultralightbeam = require('../lib/ultralightbeam')
const SolWrapper = require('ultralightbeam/lib/SolWrapper')
const Q = require('q')

module.exports = function registerMultiproxCodes(multiproxAddress) {
  const solWrapper = new SolWrapper(
    ultralightbeam,
    contracts.Multiprox.abi,
    multiproxAddress
  )

  return Q.all([
    solWrapper.broadcast(
      'registerCode(bytes)',
      [contracts.Store.bytecode]
    ).transactionPromise.then(() => {
      console.log('Registered Store on Multiprox'.green)
    }),
    solWrapper.broadcast(
      'registerCode(bytes)',
      [contracts.Submarket.bytecode]
    ).transactionPromise.then(() => {
      console.log('Registered Submarket on Multiprox'.green)
    })
  ])
}

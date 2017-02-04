const contracts = require('safemarket-protocol/modules/contracts')
const ultralightbeam = require('../lib/ultralightbeam')
const SolWrapper = require('ultralightbeam/lib/SolWrapper')
const Q = require('q')

module.exports = function registerGodCodes(godAddress) {
  const solWrapper = new SolWrapper(
    ultralightbeam,
    contracts.God.abi,
    godAddress
  )

  return Q.all([
    solWrapper.broadcast(
      'registerCode(bytes)',
      [contracts.Proxy.code]
    ).transactionPromise.then(() => {
      console.log('Registered Proxy on God'.green)
    })
  ])
}

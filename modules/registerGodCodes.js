const contracts = require('safemarket-protocol/modules/contracts')
const Q = require('q')
const solwrappers = require('../lib/solWrappers')

Q.all([
  solwrappers.God.broadcast(
    'registerCode(bytes)',
    [contracts.Proxy.code]
  ).transactionPromise.then(() => {
    console.log('Registered Proxy on God'.green)
    process.exit()
  })
])

const TestRPC = require('ethereumjs-testrpc')
const environment = require('../lib/environment')

module.exports = TestRPC.server({
  blocktime: 12,
  accounts: [{
    balance: 100000000000000000000,
    secretKey: environment.profile.account.privateKey.to('hex.prefixed')
  }],
  locked: false
})

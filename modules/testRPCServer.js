const TestRPC = require('ethereumjs-testrpc')
const environment = require('../lib/environment')

module.exports = TestRPC.server({
  blocktime: 12,
  accounts: environment.profiles.map((profile) => {
    return {
      balance: 100000000000000000000,
      secretKey: profile.persona.privateKey.to('hex.prefixed')
    }
  }),
  locked: false
})

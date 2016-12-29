const ultralightbeam = require('../lib/ultralightbeam')
const TestRPC = require('ethereumjs-testrpc')
const Amorph = require('../lib/classes/Amorph')
const environment = require('../lib/environment')

ultralightbeam.provider = TestRPC.provider({
  blocktime: 1,
  accounts: environment.profiles.map((profile) => {
    return {
      balance: new Amorph(100000000000000000000000000, 'number'),
      secretKey: profile.persona.privateKey.to('hex.prefixed')
    }
  }),
  locked: false
})
ultralightbeam.blockPoller.start(1000)

module.exports = ultralightbeam

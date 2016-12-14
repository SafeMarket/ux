/* eslint-disable no-console */

const TestRPC = require('ethereumjs-testrpc')
const HttpServer = require('http-server')
const contracts = require('../lib/contracts')
const ultralightbeam = require('../lib/ultralightbeam')
const profiles = require('./dev-profiles')


const testRPCserver = TestRPC.server({
  blocktime: 3,
  accounts: profiles.map((profile) => {
    return {
      balance: 1000000000000,
      secretKey: profile.persona.privateKey.to('hex.prefixed')
    }
  }),
  locked: false
})

const httpServer = HttpServer.createServer()

testRPCserver.listen(8545)
httpServer.listen(8080)

console.log('TestRPC Server lisetning on :8545')
console.log('HTTP Server lisetning on :8080')

ultralightbeam
  .add(contracts.AliasReg.solbuilder.deploy([], {
    from: profiles[0].persona
  }))
  .then((transactionReceipt) => {
    console.log('deployed AliasReg to', transactionReceipt.contractAddress.to('hex'))
    contracts.AliasReg.address = transactionReceipt.address
  }, (err) => {
    console.error(err)
  })

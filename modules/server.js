/* eslint-disable no-console */
require('colors')

process.on('uncaughtException', (err) => {
  console.log(err)
  process.exit(1)
})

const httpServer = require('./httpServer')
const testRPCServer = require('./testRPCServer')

httpServer.listen(8080)
testRPCServer.listen(8545)

console.log('HTTP Server lisetning on :8080'.green)
console.log('TestRPC Server lisetning on :8545'.green)

/* eslint-disable no-console */
require('colors')
const testRPCserver = require('./testRPCServer')
const httpServer = require('./httpServer')
const deploy = require('./deploy')
const generateContractAddressesHex = require('./generators/contractAddressesHex')
const setTickerPrices = require('./setTickerPrices')
const registerGodCodes = require('./registerGodCodes')
const setOrderRegTicker = require('./setOrderRegTicker')
const setup = require('./setup')

testRPCserver.listen(8545)
httpServer.listen(8080)

console.log('TestRPC Server lisetning on :8545'.green)
console.log('HTTP Server lisetning on :8080'.green)

deploy().then((contractAddresses) => {
  generateContractAddressesHex(contractAddresses)
  return registerGodCodes(contractAddresses.God).then(() => {
    return setTickerPrices(contractAddresses.Ticker).then(() => {
      return setOrderRegTicker(contractAddresses.OrderReg, contractAddresses.Ticker).then(() => {
        return setup().then(() => {
          console.log('Done!'.green)
        })
      })
    })
  })
}, (err) => {
  console.error(err)
  process.exit(1)
}).catch((err) => {
  console.error(err)
  process.exit(1)
})

const solWrappers = require('../lib/solWrappers')

solWrappers.OrderReg.broadcast('setTicker(address)', [solWrappers.Ticker.address]).getConfirmation().then(() => {
  console.log(`Set OrderReg.ticker to ${solWrappers.Ticker.address.to('hex.prefixed')}`.green)
  process.exit()
})

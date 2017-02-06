const contracts = require('safemarket-protocol/modules/contracts')
const ultralightbeam = require('../lib/ultralightbeam')
const SolWrapper = require('ultralightbeam/lib/SolWrapper')

module.exports = function setTickerPrices(orderRegAddress, tickerAddress) {

  const orderReg = new SolWrapper(
    ultralightbeam,
    contracts.OrderReg.abi,
    orderRegAddress
  )

  return orderReg.broadcast('setTicker(address)', [tickerAddress]).getConfirmation().then(() => {
    console.log(`Set OrderReg.ticker to ${tickerAddress.to('hex.prefixed')}`.green)
  })
}

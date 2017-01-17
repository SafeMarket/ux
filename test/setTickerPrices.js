const contractAddresses = require('./deploy')
const setTickerPrices = require('../modules/setTickerPrices')
const contracts = require('../lib/contracts')
const currencies = require('../lib/currencies')
const ultralightbeam = require('./ultralightbeam')
const SolWrapper = require('ultralightbeam/lib/SolWrapper')

describe('setTickerPrices', () => {

  let solWrapper

  it('should create solWrapper', () => {
    solWrapper = new SolWrapper(
      ultralightbeam,
      contracts.Ticker.abi,
      contractAddresses.Ticker
    )
  })

  it('should be fulfilled', () => {
    return setTickerPrices(contractAddresses.Ticker).should.be.fulfilled
  })

  it('get WEI price as 1', () => {
    solWrapper.fetch(
      'getPrice(bytes4)',
      [currencies.WEI]
    ).should.eventually.amorphTo('number').equal(1)
  })

  it('get ETH price as 11000000000000000000', () => {
    solWrapper.fetch(
      'getPrice(bytes4)',
      [currencies.ETH]
    ).should.eventually.amorphTo('number').equal(1000000000000000000)
  })
})

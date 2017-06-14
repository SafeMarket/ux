const Q = require('q')
const Amorph = require('../lib/classes/Amorph')
const solwrappers = require('../lib/solWrappers')
const _ = require('lodash')

const prices = {
  ETH0: new Amorph('1000000000000000000', 'number.string'),
  USD6: new Amorph('300000000000000000000000000', 'number.string'),
  EUR6: new Amorph('400000000000000000000000000', 'number.string')
}

const promises = _.map(prices, (price, currencyAscii) => {
  console.log(`Setting ${currencyAscii} to ${price.to('number.string')}`)
  return solwrappers.OrderReg.broadcast(
    'setPrice(bytes4,uint256)',
    [new Amorph(currencyAscii, 'ascii'), price],
    {}
  ).getConfirmation()
})

Q.all(promises).then(() => {
  console.log('Done writing Ticker prices'.green)
  process.exit()
}).catch((err) => {
  console.log(err)
})

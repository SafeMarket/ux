const _ = require('lodash')
const Pricemorph = require('./Pricemorph')

function OrderTransport(order, id) {
  this.id = id
  this.price = new Pricemorph(order.transportPrice, order.currency.to('ascii'))
  _.merge(this, order.meta.value.transports[this.id.to('number')])
}

module.exports = OrderTransport

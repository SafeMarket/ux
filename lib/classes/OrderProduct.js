const Pricemorph = require('./Pricemorph')
const _ = require('lodash')

module.exports = function OrderProduct(order, index) {
  this.index = index
  this.promise = order.orderReg.fetch('ordersProducts(uint256,uint256)', [order.id, index]).then((product) => {
    this.id = product.id
    this.price = new Pricemorph(product.price, order.currency.to('ascii'))
    this.quantity = product.quantity
    _.merge(this, order.meta.value.products[this.id.to('number')])
  })
}

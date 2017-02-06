const solWrappers = require('../solWrappers')
const Q = require('q')
const _ = require('lodash')
const OrderProduct = require('./OrderProduct')
const OrderTransport = require('./OrderTransport')
const Amorph = require('./Amorph')
const ipfsAmorphApi = require('../ipfsAmorphApi')
const protobufferTypes = require('../protobufferTypes')

module.exports = function Order(id) {
  this.id = id
  this.products = []
  this.orderReg = solWrappers.OrderReg

  this.promise = Q.all([
    this.orderReg.fetch('orderInfoAs(uint256)', id),
    this.orderReg.fetch('orderInfoBs(uint256)', id)
  ]).then((results) => {
    results.forEach((orderInfo) => {
      _.merge(this, orderInfo)
    })
    return ipfsAmorphApi.getFile(this.storeMetaMultihash).then((meta) => {
      this.storeMeta =
      _.range(this.productsCount.to('number'), (productIndex) => {
        this.products.push(new OrderProduct(this, new Amorph(productIndex, 'number')))
      })
      this.transport = new OrderTransport(this)
    })
  })
}

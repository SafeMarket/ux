const Q = require('q')
const _ = require('lodash')
const OrderProduct = require('./OrderProduct')
const OrderTransport = require('./OrderTransport')
const Amorph = require('./Amorph')
const ipfsAmorphApi = require('../ipfsAmorphApi')
const protobufferTypes = require('../protobufferTypes')
const uncompressMultihash = require('../utils/uncompressMultihash')

module.exports = function Order(orderReg, id) {
  this.id = id
  this.products = []
  this.orderReg = orderReg

  this.promise = Q.all([
    this.orderReg.fetch('orderInfoAs(uint256)', [id]),
    this.orderReg.fetch('orderInfoBs(uint256)', [id])
  ]).then((results) => {
    results.forEach((orderInfo) => {
      _.merge(this, orderInfo)
    })
    this.metaMultihash = uncompressMultihash(this.metaMultihash)
    return ipfsAmorphApi.getFile(this.metaMultihash).then((metaFile) => {
      this.meta = protobufferTypes.Store.decode(metaFile.to('buffer'))
      _.range(this.productsCount.to('number')).forEach((productIndex) => {
        this.products.push(new OrderProduct(this, new Amorph(productIndex, 'number')))
      })
      this.transport = new OrderTransport(this, this.transportId)
      this.isArbitrator = this.arbitrator.to('number') > 0
      this.isAffiliate = this.affiliate.to('number') > 0
    })
  })
}

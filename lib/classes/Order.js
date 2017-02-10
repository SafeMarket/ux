const Q = require('q')
const _ = require('lodash')
const OrderProduct = require('./OrderProduct')
const OrderTransport = require('./OrderTransport')
const Amorph = require('./Amorph')
const ipfsAmorphApi = require('../ipfsAmorphApi')
const protobufferTypes = require('../protobufferTypes')
const uncompressMultihash = require('../utils/uncompressMultihash')
const Pricemorph = require('./Pricemorph')
const pricemorphsPoller = require('../pricemorphsPoller')
const settingsManager = require('../settingsManager')
const getIsOwner = require('../utils/getIsOwner')
const SolWrapper = require('ultralightbeam/lib/SolWrapper')
const ultralightbeam = require('../ultralightbeam')
const contracts = require('safemarket-protocol/modules/contracts')

function Order(orderReg, id) {
  this.id = id
  this.label = `Order #${id.to('number')}`
  this.products = []
  this.orderReg = orderReg
  this.promise = this.download()
}

Order.prototype.download = function download() {
  const settings = settingsManager.get()
  return Q.all([
    this.orderReg.fetch('orderInfoAs(uint256)', [this.id]),
    this.orderReg.fetch('orderInfoBs(uint256)', [this.id])
  ]).then((results) => {
    results.forEach((orderInfo) => {
      _.merge(this, orderInfo)
    })
    this.metaMultihash = uncompressMultihash(this.metaMultihash)
    this.isArbitrator = this.arbitrator.to('number') > 0
    this.isAffiliate = this.affiliate.to('number') > 0
    this.received = new Pricemorph(this.receivedWEI, 'WEI')
    this.prebuffer = new Pricemorph(this.prebufferCURR, this.currency.to('ascii'))
    this.userIsBuyer = settings.profile.persona.address.equals(this.buyer, 'array')
    this.store = new SolWrapper(ultralightbeam, contracts.Proxy.abi, this.store)

    if (this.isArbitrator) {
      this.arbitrator = new SolWrapper(ultralightbeam, contracts.Proxy.abi, this.arbitrator)
      getIsOwner(this.arbitrator.address, settings.profile.persona.address).then((isOwner) => {
        this.userIsArbitratorOwner = isOwner
      })
    }

    getIsOwner(this.store.address, settings.profile.persona.address).then((isOwner) => {
      this.userIsStoreOwner = isOwner
    })

    if (pricemorphsPoller.isReady) {
      this.calculate()
    } else {
      pricemorphsPoller.promise.then(() => {
        this.calculate()
      })
    }

    return ipfsAmorphApi.getFile(this.metaMultihash).then((metaFile) => {
      this.meta = protobufferTypes.Store.decode(metaFile.to('buffer'))
      _.range(this.productsCount.to('number')).forEach((productIndex) => {
        this.products.push(new OrderProduct(this, new Amorph(productIndex, 'number')))
      })
      this.transport = new OrderTransport(this, this.transportId)
    })
  })
}

Order.prototype.calculate = function calculate() {
  this.bufferRemaining = new Pricemorph(this.receivedWEI.as('bignumber', (bignumber) => {
    return bignumber.minus(this.prebuffer.to('WEI').to('bignumber'))
  }), 'WEI')
  this.bufferRemainingPerun = this.bufferRemaining.to('WEI').as('bignumber', (bignumber) => {
    return bignumber.div(this.prebuffer.to('WEI').to('bignumber'))
  })
}

module.exports = Order

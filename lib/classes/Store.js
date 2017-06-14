const solWrappers = require('../solWrappers')
const protocol = require('../protocol')
const planetoidUtils = require('planetoid-utils')
const StoreProduct = require('./StoreProduct')
const StoreTransport = require('./StoreTransport')

function Store(id) {
  this.id = id.as('array', (array) => {
    while (array.length < 32) {
      array.push(0)
    }
    return array
  })

  this.products = []
  this.transports = []

  this.promise = solWrappers.StoreReg.fetch('stores(bytes32)', [this.id]).then((_store) => {
    this.owner = _store.owner
    this.productsUrl = `/#!/stores/${this.id.to('ascii.stripped')}/products`
    this.aboutUrl = `/#!/stores/${this.id.to('ascii.stripped')}/about`
    return solWrappers.Planetoid.fetch('records(bytes32)', [_store.metaHash]).then((__record) => {
      const _record = __record.as('array', (array) => {
        while (array.length < 96) {
          array.push(0)
        }
        return array
      })
      const record = planetoidUtils.unmarshalRecord(_record)
      return solWrappers.Planetoid.fetch('documents(bytes32)', [record.documentHash]).then((meta) => {
        this.meta = protocol.unmarshalStoreMeta(meta)
      })
    })
  }).then(() => {
    this.isReady = true
    this.meta.value.products.forEach((product, index) => {
      this.products.push(new StoreProduct(this, index, product))
    })
    this.meta.value.transports.forEach((transport, index) => {
      this.transports.push(new StoreTransport(this, index, transport))
    })
    return this
  })
}

module.exports = Store

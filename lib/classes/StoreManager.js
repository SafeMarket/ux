const arguguard = require('arguguard')
const Amorph = require('amorph')
const Store = require('./Store')

function StoreManager() {
  this.stores = {}
}

StoreManager.prototype.get = function getStore(id) {
  arguguard('StoreManager', ['Amorph'], arguments)
  const idHex = id.to('hex')
  if (!this.stores[idHex]) {
    this.stores[idHex] = new Store(id)
  }
  return this.stores[idHex].promise
}

module.exports = StoreManager

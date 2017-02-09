const Store = require('../lib/classes/Store')
const Arbitrator = require('../lib/classes/Arbitrator')
const Amorph = require('../lib/classes/Amorph')
const Pricemorph = require('../lib/classes/Pricemorph')
const ultralightbeam = require('../lib/ultralightbeam')
const authfile = require('../generated/authfile.gs')
const parseAuthfile = require('../lib/utils/parseAuthfile')
const settingsManager = require('../lib/settingsManager')
const parseMultiproxTransactionReceipt = require('../lib/utils/parseMultiproxTransactionReceipt')
const ipfsAmorphApi = require('../lib/ipfsAmorphApi')
const MICRO = require('../lib/constants/MICRO')
const Q = require('q')

const profiles = parseAuthfile(authfile, 'password')
settingsManager.set({
  profiles: profiles,
  profile: profiles[0]
})

function createStore() {
  const store = new Store()
  store.alias = new Amorph('mystore', 'ascii')
  store.name = 'My Store'
  store.base = 'us'
  store.info = 'Store Info'
  store.coinbase = new Amorph(1, 'number')
  store.currency = new Amorph('6USD', 'ascii')
  store.products[0].name = 'My Product'
  store.products[0].info = 'Info about the product'
  store.products[0].price = new Pricemorph(new Amorph(MICRO.pow(-1).times(1), 'bignumber'), '6USD')
  store.products[0].quantity = new Amorph('100', 'number')
  store.transports[0].name = 'My Transport'
  store.transports[0].info = 'Info about the transport'
  store.transports[0].price = new Pricemorph(new Amorph(MICRO.pow(-1).times(2), 'bignumber'), '6USD')
  return ipfsAmorphApi.addFile(store.getMetaFile()).then(() => {
    return ultralightbeam.sendTransaction(store.getTransactionRequest()).getTransactionReceipt().then((transactionReceipt) => {
      const parsed = parseMultiproxTransactionReceipt(transactionReceipt)
      store.solWrapper.address = parsed.contractAddress
      console.log(`Deployed store to ${store.solWrapper.address.to('hex.prefixed')}`.green)
      return store
    })
  })
}

function createArbitrator() {
  const arbitrator = new Arbitrator()
  arbitrator.alias = new Amorph('myarbitrator', 'ascii')
  arbitrator.name = 'My Arbitrator'
  arbitrator.info = 'Arbitrator Info'
  arbitrator.currency = new Amorph('6USD', 'ascii')
  arbitrator.feeBase = new Pricemorph(new Amorph(MICRO.pow(-1).times(1), 'bignumber'), '6USD')
  arbitrator.feeMicroperun = new Amorph(MICRO.pow(-1).times(0.01), 'bignumber')

  return ipfsAmorphApi.addFile(arbitrator.getMetaFile()).then(() => {
    return ultralightbeam.sendTransaction(arbitrator.getTransactionRequest()).getTransactionReceipt().then((transactionReceipt) => {
      const parsed = parseMultiproxTransactionReceipt(transactionReceipt)
      arbitrator.solWrapper.address = parsed.contractAddress
      console.log(`Deployed arbitrator to ${arbitrator.solWrapper.address.to('hex.prefixed')}`.green)
      return arbitrator
    })
  })
}

module.exports = function setup() {
  return createStore().then((store) => {
    return createArbitrator().then((arbitrator) => {
      store.approvedArbitrators.push(arbitrator.solWrapper.address)
      arbitrator.approvedStores.push(store.solWrapper.address)
      const storeUpload = store.schema.upload(store.getLocalState(), (method, args) => {
        return store.solWrapper.broadcast(method, args)
      })
      const arbitratorUpload = arbitrator.schema.upload(arbitrator.getLocalState(), (method, args) => {
        return arbitrator.solWrapper.broadcast(method, args)
      })
      return Q.all([storeUpload, arbitratorUpload]).then(() => {
        console.log('Cross-approved store and arbitrator'.green)
      })
    })
  })
}

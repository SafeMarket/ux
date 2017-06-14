const Amorph = require('../lib/classes/Amorph')
const Q = require('q')
const protocol = require('../lib/protocol')
const environment = require('../lib/environment')
const SolWrapper = require('ultralightbeam/lib/SolWrapper')
const ultralightbeam = require('../lib/ultralightbeam')
const contracts = require('../lib/contracts')
const colors = require('colors')

const storePrefund = new Amorph('10000000000000000', 'number.string')
const affiliateFeeMicroperun = new Amorph('50000', 'number.string')
const currency = new Amorph('USD6', 'ascii')
const planetoidUtils = require('planetoid-utils')


module.exports = function setup(contractAddresses) {

  const OrderReg = new SolWrapper(ultralightbeam, contracts.OrderReg.abi, contractAddresses.OrderReg)
  const StoreReg = new SolWrapper(ultralightbeam, contracts.StoreReg.abi, contractAddresses.StoreReg)
  const Planetoid = new SolWrapper(ultralightbeam, contracts.Planetoid.abi, contractAddresses.Planetoid)

  return Q.all([
    OrderReg.broadcast('setPlanetoid(address)', [Planetoid.address], {}).getConfirmation(),
    OrderReg.broadcast('setStorePrefund(uint256)', [storePrefund], {}).getConfirmation(),
    OrderReg.broadcast('setAffiliateFeeMicroperun(uint256)', [affiliateFeeMicroperun], {}).getConfirmation(),
    StoreReg.broadcast('setPlanetoid(address)', [Planetoid.address], {}).getConfirmation()
  ]).then(() => {
    const randomInt = Math.floor(Math.random() * 9999999)
    const storeId = new Amorph(`safezero${randomInt}`, 'ascii')
    const meta = protocol.marshalStoreMeta({
      branch: 'v0',
      value: {
        name: new Amorph('SafeZero', 'ascii'),
        tagline: new Amorph('The official store of SafeZero', 'ascii'),
        contact: new Amorph('hello@safezero.org', 'ascii'),
        info: new Amorph('The official store of SafeZero and first autonomous store on the SafeMarket peer to peer marketplace.', 'ascii'),
        publicKey: environment.profile.account.compressedPublicKey,
        isOpen: new Amorph(true, 'boolean'),
        base: new Amorph('us', 'ascii'),
        priceSetter: environment.priceSetter,
        currency: currency,
        minProductsTotal: new Amorph(0, 'number'),
        bufferMicroperun: new Amorph('500000', 'number.string'),
        products: [
          {
            name: new Amorph('"sadoodz" by Cosmic Nuggets', 'ascii'),
            price: new Amorph(50000000, 'number'),
            imageMultihashes: [
              new Amorph('Qmc23pFXBTxddkgHwA6oW25WNKWq6MHt4FsKLBwoTBR86f', 'base58'),
              new Amorph('QmQ1rrc6GMCwrQm7Q1Rgwfi8GGpSGWYBQoGcBJpNGSU4xa', 'base58')
            ],
            info: new Amorph('16 x 20 Canvas', 'ascii')
          }, {
            name: new Amorph('"inner spiritz" by Cosmic Nuggets', 'ascii'),
            price: new Amorph(50000000, 'number'),
            imageMultihashes: [
              new Amorph('QmYtRaAZWDukFFEwtWGpy2zAyFi5bfzoe7YT8oDAJ58JSZ', 'base58'),
              new Amorph('QmZiit8vuC1EgisUNp4d9gXqceUTbeZ66BGPX2LJN1edmV', 'base58')
            ],
            info: new Amorph('16 x 20 Canvas', 'ascii')
          }
        ],
        transports: [
          {
            name: new Amorph('Free Domestic Shipping', 'ascii'),
            to: new Amorph('us', 'ascii'),
            price: new Amorph(0, 'number'),
            info: new Amorph('Within the United States', 'ascii')
          },
          {
            name: new Amorph('International Shipping', 'ascii'),
            to: new Amorph('us', 'ascii'),
            price: new Amorph('10000000', 'number.string'),
            info: new Amorph('Outside the United States', 'ascii')
          }
        ]
      }
    })
    console.log('meta length', meta.to('array').length)
    return StoreReg.broadcast('register(bytes32,bytes)', [storeId, meta], {}).getConfirmation().then(() => {
      return StoreReg.fetch('stores(bytes32)', [storeId]).then((_store) => {
        return Planetoid.fetch('records(bytes32)', [_store.metaHash]).then((_record) => {
          const record = planetoidUtils.unmarshalRecord(_record)
          return Planetoid.fetch('documents(bytes32)', [record.documentHash]).then((document) => {
            console.log(`Done! Set up ${storeId.to('ascii')}`.green)
            process.exit()
          })
        })
      })
    })
  }).catch((err) => {
    console.log(err)
  })
}

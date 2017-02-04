const IpfsAmorphApi = require('ipfs-amorph-api')
const Amorph = require('./classes/Amorph')
const environment = require('./environment')

IpfsAmorphApi.Amorph = Amorph

module.exports = new IpfsAmorphApi(environment.ipfs)

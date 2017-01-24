const IpfsApi = require('ipfs-amorph-api')
const environment = require('./environment')

module.exports = new IpfsApi(environment.ipfs)

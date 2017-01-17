const IpfsApi = require('ipfs-api')
const Amorph = require('./Amorph')
const Q = require('q')
const environment = require('../environment')

function Ipfs() {
  this.api = IpfsApi(
    environment.ipfs.host,
    environment.ipfs.port,
    { protocol: environment.ipfs.protocol }
  )
}

Ipfs.prototype.defer = function defer() {
  return Q.defer()
}

Ipfs.prototype.uploadFiles = function uploadFiles(files) {
  const fileBuffers = files.map((file) => {
    return file.to('buffer')
  })
  return this.api.add(fileBuffers).then((results) => {
    return results.map((result) => {
      return new Amorph(result.hash, 'base58')
    })
  })
}

Ipfs.prototype.getFile = function fetchFile(multihash) {
  const deferred = this.defer()
  this.api.get(multihash.to('base58')).then((readable) => {
    readable.on('readable', () => {
      const result = readable.read()
      if (!result) {
        return
      }

      const data = []

      result.content.on('data', (_data) => {
        data.push(..._data)
      })
      result.content.on('end', () => {
        deferred.resolve(new Amorph(data, 'array'))
      })
    })
  })
  return deferred.promise
}

module.exports = Ipfs

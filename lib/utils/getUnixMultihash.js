const UnixFs = require('ipfs-unixfs')
const DAGNode = require('ipfs-merkle-dag').DAGNode
const Amorph = require('../classes/Amorph')

module.exports = function getUnixMultihash(file) {
  const data = new UnixFs('file', file.to('buffer'))
  const dagNode = new DAGNode(data.marshal(), [])
  return new Amorph(dagNode.toJSON().Hash, 'base58')
}

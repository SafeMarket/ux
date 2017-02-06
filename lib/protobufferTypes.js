const protofile = require('./protofile')
const protobufjs = require('protobufjs')

const root = protobufjs.parse(protofile.to('utf8')).root

module.exports = {
  Store: root.lookup('safemarket.Store'),
  Arbitrator: root.lookup('safemarket.Store')
}

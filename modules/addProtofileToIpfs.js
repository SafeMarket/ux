const protofile = require('../lib/protofile')
const ipfs = require('../lib/ipfs')
const getUnixMultihash = require('../lib/utils/getUnixMultihash')

const expected = getUnixMultihash(protofile)
console.log(`expect multihash ${expected}`)

ipfs.addFile(protofile).then((multihash) => {
  console.log(`added protofile as ${multihash.to('base58')}`.green)
  process.exit()
})

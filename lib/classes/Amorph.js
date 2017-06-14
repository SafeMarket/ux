const Amorph = require('amorph')
const setAmorph = require('safemarket-protocol/lib/setAmorph')

setAmorph(Amorph)

Amorph.loadPlugin(require('amorph-base58'))
Amorph.loadPlugin(require('amorph-base2048'))

Amorph.crossConverter.addConverter('ascii', 'ascii.stripped', (ascii) => {
  return ascii.replace(/\0/g, '')
})

Amorph.crossConverter.addConverter('array', 'uint8Array', (array) => {
  return new Uint8Array(array)
})

Amorph.crossConverter.addConverter('uint8Array', 'buffer', (uint8Array) => {
  return new Buffer(uint8Array)
})

setAmorph(Amorph)


Amorph.crossConverter.addPath(['base2048.english', 'buffer', 'uint8Array'])
Amorph.crossConverter.addPath(['array', 'buffer', 'ascii', 'ascii.stripped'])
Amorph.crossConverter.addPath(['web3.address', 'hex.prefixed', 'hex', 'bignumber'])
Amorph.crossConverter.addPath(['ascii', 'buffer', 'hex'])
Amorph.crossConverter.addPath(['uint8Array', 'buffer', 'ascii'])
Amorph.crossConverter.addPath(['uint8Array', 'buffer', 'base58'])
// Amorph.crossConverter.addPath(['ascii', 'buffer', 'uint8Array'])
// Amorph.crossConverter.addPath(['ascii', 'buffer', 'uint8Array'])
// Amorph.crossConverter.addPath(['uint8Array', 'array', 'hex'])
// Amorph.crossConverter.addPath(['uint8Array', 'array', 'hex', 'hex.prefixed'])
// Amorph.crossConverter.addPath(['array', 'hex', 'hex.prefixed', 'web3.bytes'])

module.exports = Amorph

const Amorph = require('ultralightbeam/lib/Amorph')

Amorph.loadPlugin(require('amorph-hex'))
Amorph.loadPlugin(require('amorph-base58'))
Amorph.loadPlugin(require('amorph-bignumber'))
Amorph.loadPlugin(require('amorph-buffer'))

Amorph.loadConverter('web3.bytes', 'ascii', (hexPrefixed) => {
  const array = Amorph.crossConverter.convert(hexPrefixed, 'hex.prefixed', 'array').filter((byte) => {
    return byte > 0
  })
  return Amorph.crossConverter.convert(array, 'array', 'ascii')
})

Amorph.ready()

module.exports = Amorph

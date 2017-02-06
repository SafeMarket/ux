module.exports = function uncompressMultihash(multihash) {
  return multihash.as('array', (array) => {
    return [0x12, 0x20].concat(array)
  })
}

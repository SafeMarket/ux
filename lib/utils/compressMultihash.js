module.exports = function compressMultihash(multihash) {
  return multihash.as('array', (array) => {
    return array.slice(2)
  })
}

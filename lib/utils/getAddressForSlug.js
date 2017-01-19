const Q = require('q')
const Amorph = require('../classes/Amorph')

module.exports = function getAddressForSlug(slug) {
  if (slug.indexOf('0x') === 0 && slug.length === 42) {
    return Q.resolve(new Amorph(slug, 'hex.prefixed'))
  }
  return Q.reject()
}

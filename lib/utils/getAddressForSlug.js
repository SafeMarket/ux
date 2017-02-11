const Q = require('q')
const Amorph = require('../classes/Amorph')
const aliasReg = require('../aliasReg')

module.exports = function getAddressForSlug(slug) {
  if (slug.indexOf('0x') === 0 && slug.length === 42) {
    return Q.resolve(new Amorph(slug, 'hex.prefixed'))
  }
  if (slug.indexOf('@') === 0 && slug.length > 1) {
    return aliasReg.getOwner(new Amorph(slug.substr(1), 'ascii'))
  }
  return Q.reject()
}

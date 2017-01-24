const Amorph = require('./classes/Amorph')
const protofileUtf8 = require('../generated/protofileUtf8')

module.exports = new Amorph(protofileUtf8, 'utf8')

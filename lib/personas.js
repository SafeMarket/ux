const Persona = require('ultralightbeam/lib/Persona')
const Amorph = require('./Amorph')
const _ = require('lodash')

module.exports = _.range(10).map((index) => {
  const privateKeyArray = (new Array(32)).fill(0)
  privateKeyArray[0] = index + 1
  const privateKey = new Amorph(privateKeyArray, 'array')
  const persona = new Persona(privateKey)
  return persona
})

const Persona = require('ultralightbeam/lib/Persona')
const Keypair = require('./Keypair')
const Amorph = require('./Amorph')

function Profile(persona, keypair) {
  this.persona = persona || new Persona()
  this.keypair = keypair || new Keypair()

  const addressArray = this.persona.address.to('array')
  const publicKeyArray = this.keypair.publicKey.to('array')
  this.id = new Amorph(addressArray.concat(publicKeyArray), 'array')
}

module.exports = Profile

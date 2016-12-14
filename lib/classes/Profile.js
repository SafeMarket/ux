const Persona = require('ultralightbeam/lib/Persona')
const Keypair = require('./Keypair')
const ultralightbeam = require('../ultralightbeam')
const blockFlags = require('ultralightbeam/lib/blockFlags')

function Profile(persona, keypair) {
  this.persona = persona || new Persona()
  this.keypair = keypair || new Keypair()
}

Profile.prototype.getBalance = function getBalance() {
  return ultralightbeam.eth.getBalance(this.persona.address, blockFlags.latest)
}

module.exports = Profile

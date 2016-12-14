const aes = require('crypto-js/aes')
const md5 = require('crypto-js/md5')
const Profile = require('../Profile')
const Persona = require('ultralightbeam/lib/Persona')
const Keypair = require('../Keypair')
const Amorph = require('../Amorph')
const CryptoJS = require('crypto-js')

module.exports = function readAuthfile(authfile, passphrase) {
  const plaintext = aes.decrypt(authfile, passphrase).toString(CryptoJS.enc.Utf8)
  const checksum = plaintext.substr(0, 32)
  const json = plaintext.substr(32)
  if (md5(json).toString() !== checksum) {
    return null
  }
  const profilesPojo = JSON.parse(json)
  return profilesPojo.map((profilePojo) => {
    const persona = new Persona(new Amorph(profilePojo.eth, 'hex'))
    const keypair = new Keypair(new Amorph(profilePojo.nacl, 'hex'))
    return new Profile(persona, keypair)
  })
}

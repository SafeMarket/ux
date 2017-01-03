const aes = require('crypto-js/aes')
const md5 = require('crypto-js/md5')
const Profile = require('../classes/Profile')
const Persona = require('ultralightbeam/lib/Persona')
const Keypair = require('../classes/Keypair')
const Amorph = require('../classes/Amorph')
const CryptoJS = require('crypto-js')
const AuthfileChecksumError = require('../errors/AuthfileChecksum')

module.exports = function parseAuthfile(authfile, passphrase) {
  console.log(aes.decrypt(authfile, passphrase))
  const plaintext = aes.decrypt(authfile, passphrase).toString(CryptoJS.enc.Utf8)
  const checksum = plaintext.substr(0, 32)
  const json = plaintext.substr(32)
  if (md5(json).toString() !== checksum) {
    throw new AuthfileChecksumError()
  }
  const profilesPojo = JSON.parse(json)
  return profilesPojo.map((profilePojo) => {
    const persona = new Persona(new Amorph(profilePojo.ethHex, 'hex'))
    const keypair = new Keypair(new Amorph(profilePojo.naclHex, 'hex'))
    return new Profile(persona, keypair)
  })
}

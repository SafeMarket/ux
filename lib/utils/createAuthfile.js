const aes = require('crypto-js/aes')
const md5 = require('crypto-js/md5')

module.exports = function createAuthfile(profiles, passphrase) {
  const json = JSON.stringify(profiles.map((profile) => {
    return {
      ethHex: profile.persona.privateKey.to('hex'),
      naclHex: profile.keypair.privateKey.to('hex')
    }
  }))
  const checksum = md5(json).toString()
  const plaintext = checksum + json
  return aes.encrypt(plaintext, passphrase).toString()
}

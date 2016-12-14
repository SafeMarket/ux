const aes = require('crypto-js/aes')
const md5 = require('crypto-js/md5')

module.exports = function writeAuthfile(profiles, passphrase) {
  const json = JSON.stringify(profiles.map((profile) => {
    return {
      eth: profile.persona.privateKey.to('hex.prefixed'),
      nacl: profile.keypair.privateKey.to('hex.prefixed')
    }
  }))
  const checksum = md5(json).toString()
  const plaintext = checksum + json
  return aes.encrypt(plaintext, passphrase).toString()
}

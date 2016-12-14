const Amorph = require('./Amorph')
const tweetnacl = require('tweetnacl')

function Keypair(privateKey, publicKey) {
  if (!privateKey && !publicKey) {
    const boxKeypair = tweetnacl.box.keyPair()
    this.privateKey = new Amorph(boxKeypair.secretKey, 'uint8Array')
    this.publicKey = new Amorph(boxKeypair.publicKey, 'uint8Array')
  }
}

module.exports = Keypair

const Korok = require('korok')
const Profile = require('../classes/Profile')

module.exports = function parseAuthfile(authfile, passphrase) {
  const authfileArray = authfile.to('uint8Array')
  if (authfileArray[0] !== 0) {
    throw new Error(`Invalid authfile version; ${authfileArray[0]}`)
  }
  const encapsulation = authfile.as('uint8Array', (uint8Array) => {
    return uint8Array.slice(1)
  })
  const korok = Korok.unencapsulate(encapsulation, passphrase)
  return new Profile(korok.key)
}

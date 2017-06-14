const arguguard = require('arguguard')
const random = require('random-amorph')
const Amorph = require('../classes/Amorph')
const Profile = require('../classes/Profile')

module.exports = function createAuthfile(profile, passphrase) {
  arguguard('createAuthfile', [Profile, 'Amorph'], arguments)
  const encapsulation = profile.korok.encapsulate(passphrase, random(16))
  const authfile = encapsulation.as('array', (array) => {
    return [0].concat(array)
  })
  return authfile.to('base2048.english')
}

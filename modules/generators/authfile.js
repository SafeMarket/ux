const fs = require('fs')
const _ = require('lodash')
const Profile = require('../../lib/classes/Profile')
const createAuthfile = require('../../lib/utils/createAuthfile')
const Amorph = require('../../lib/classes/Amorph')

module.exports = function writeAuthfile() {
  const profile = Profile.generate()
  const authfile = createAuthfile(profile, new Amorph('password', 'ascii'))
  const pathGs = 'generated/authfile.gs'
  const pathTxt = 'generated/authfile.txt'
  fs.writeFileSync(pathGs, `module.exports = '${authfile}'`)
  fs.writeFileSync(pathTxt, authfile)
  console.log(`Wrote authfile to ${pathGs} and ${pathTxt}`.green)
}

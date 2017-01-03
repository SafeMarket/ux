const fs = require('fs')
const _ = require('lodash')
const Profile = require('../../lib/classes/Profile')
const createAuthfile = require('../../lib/utils/createAuthfile')

module.exports = function writeAuthfile() {
  const profiles = _.range(10).map(() => {
    return new Profile()
  })
  const authfile = createAuthfile(profiles, 'password')
  const pathGs = 'generated/authfile.gs'
  const pathTxt = 'generated/authfile.txt'
  fs.writeFileSync(pathGs, `module.exports = '${authfile}'`)
  fs.writeFileSync(pathTxt, authfile)
  console.log(`Wrote authfile to ${pathGs} and ${pathTxt}`.green)
}

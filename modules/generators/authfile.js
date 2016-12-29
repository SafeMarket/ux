const fs = require('fs')
const _ = require('lodash')
const Profile = require('../../lib/classes/Profile')
const createAuthfile = require('../../lib/utils/createAuthfile')

module.exports = function writeAuthfile() {
  const profiles = _.range(10).map(() => {
    return new Profile()
  })
  const authfile = createAuthfile(profiles, 'password')
  const path = 'generated/authfile.gs'
  fs.writeFileSync(path, `module.exports = '${authfile}'`)
  console.log(`Wrote authfile to ${path}`.green)
}

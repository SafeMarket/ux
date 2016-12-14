const environment = require('../environment')
const devProfiles = require('../../modules/devProfiles')

module.exports = function profileManagerService() {

  const profiles = []

  if (environment.isDev) {
    profiles.push(...devProfiles)
  }

  this.setProfiles = function setProfiles(_profiles) {
    profiles.length = 0
    profiles.push(..._profiles)
  }

  this.getProfiles = function setProfiles() {
    return profiles
  }

}

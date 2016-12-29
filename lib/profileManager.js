const environment = require('./environment')
const ProfileManager = require('./classes/ProfileManager')

module.exports = new ProfileManager(environment.profiles)

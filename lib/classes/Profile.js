const Amorph = require('./Amorph')
const arguguard = require('arguguard')
const random = require('random-amorph')
const Account = require('ethereum-account-amorph')
const Korok = require('korok')

function Profile(korokKey) {
  arguguard('Profile', ['Amorph'], arguments)
  this.korok = new Korok(korokKey)
  const accountDerivationKey = new Amorph([0], 'array')
  this.account = new Account(this.korok.derive(accountDerivationKey))
}

Profile.prototype.getOrderKey = function getOrderKey(index) {
  arguguard('profile.getOrderKey', ['number'], arguments)
  const orderDerivationKey = new Amorph([1, index], 'array')
  return this.korok.derive(orderDerivationKey)
}

Profile.generate = function generate() {
  arguguard('Profile.generate', [], arguments)
  return new Profile(random(32))
}

module.exports = Profile

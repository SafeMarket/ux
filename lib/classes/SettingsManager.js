const currencies = require('../currencies')
const profileManager = require('../profileManager')
const _ = require('lodash')
const EventEmitter = require('events')

function SettingsManager() {

  this._settings = {
    currency: currencies.USD,
    profile: profileManager.profiles.length > 0 ? profileManager.profiles[0] : null
  }

  this.emitter = new EventEmitter()
  this.read()
}

SettingsManager.prototype.get = function get() {
  return _.clone(this._settings)
}

SettingsManager.prototype.set = function set(settings) {
  _.merge(this._settings, settings)
  this.write()
  this.emitter.emit('settings', this.get())
}

SettingsManager.prototype.read = function read() {
  const settingsJson = localStorage.getItem('settingsJson')
  if (!settingsJson || settingsJson.length === 0) {
    return
  }

  let settingsPojo

  try {
    settingsPojo = JSON.parse(settingsJson)
  } catch (err) {
    return
  }

  if (settingsPojo.currencyAscii && currencies[settingsPojo.currencyAscii]) {
    this._settings.currency = currencies[settingsPojo.currencyAscii]
  }

  if (settingsPojo.profileIdHex) {
    const profile = _.find(profileManager.profiles, (_profile) => {
      return _profile.id.to('hex') === settingsPojo.profileIdHex
    })
    if (profile) {
      this._settings.profile = profile
    }
  }
}

SettingsManager.prototype.write = function save() {
  const settingsJson = JSON.stringify(this.toPojo())
  localStorage.setItem('settingsJson', settingsJson)
}

SettingsManager.prototype.toPojo = function toPojo() {
  return {
    currencyAscii: this._settings.currency.to('ascii'),
    profileIdHex: this._settings.profile.id.to('hex')
  }
}

module.exports = SettingsManager

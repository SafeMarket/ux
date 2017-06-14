const currencies = require('../currencies')
const countries = require('../countries')
const _ = require('lodash')
const EventEmitter = require('events')
const arguguard = require('arguguard')

function SettingsManager() {
  arguguard('SettingsManager', [], arguments)
  this.emitter = new EventEmitter()
  this._settings = {
    currency: currencies.USD6,
    country: countries.dictionary.us
  }
  this.read()
  this.emitter.emit('settings', this._settings)
}

SettingsManager.prototype.logout = function logout() {
  arguguard('settingsManager.logout', [], arguments)
  this.set({
    profile: null,
    profiles: null
  })
}

SettingsManager.prototype.get = function get() {
  arguguard('settingsManager.get', [], arguments)
  return _.clone(this._settings)
}

SettingsManager.prototype.set = function set(settings) {
  arguguard('settingsManager.set', [Object], arguments)
  _.merge(this._settings, settings)
  this.write()
  this.emitter.emit('update', this.get())
}

SettingsManager.prototype.read = function read() {
  arguguard('settingsManager.read', [], arguments)
  if (typeof localStorage === 'undefined') {
    return
  }
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

  if (settingsPojo.countryCode && countries.dictionary[settingsPojo.countryCode]) {
    this._settings.country = countries.dictionary[settingsPojo.countryCode]
  }

  if (settingsPojo.profileIdHex) {
    const profile = _.find(this._settings.profiles, (_profile) => {
      return _profile.id.to('hex') === settingsPojo.profileIdHex
    })
    if (profile) {
      this._settings.profile = profile
    }
  }
}

SettingsManager.prototype.write = function write() {
  arguguard('settingsManager.write', [], arguments)
  if (typeof localStorage === 'undefined') {
    return
  }
  const settingsJson = JSON.stringify(this.toPojo())
  localStorage.setItem('settingsJson', settingsJson)
}

SettingsManager.prototype.toPojo = function toPojo() {
  arguguard('settingsManager.toPojo', [], arguments)
  const settings = this.get()
  const pojo = {}

  if (settings.currency) {
    pojo.currencyAscii = settings.currency.to('ascii')
  }

  if (settings.country) {
    pojo.countryCode = settings.country.code
  }

  if (settings.profile) {
    pojo.profileIdHex = settings.profile.id.to('hex')
  }

  return pojo
}

module.exports = SettingsManager

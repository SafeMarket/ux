const emojiFlags = require('emoji-flags')
const _ = require('lodash')

module.exports = function Place(code, name, emoji) {
  _.merge(this, { code, name, emoji })
  if (!this.emoji) {
    const emojiFlagData = emojiFlags.countryCode(code.toUpperCase())
    if (emojiFlagData && emojiFlagData.emoji) {
      this.emoji = emojiFlagData.emoji
    } else {
      this.emoji = '🌕'
    }
  }
}

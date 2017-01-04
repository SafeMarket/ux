const blurbsPojo = require('../../generated/blurbsPojo.gs')
const sprintf = require('sprintf-js').sprintf

module.exports = function getBlurb(id, _args) {
  const args = _args || []
  const format = blurbsPojo[id].eng
  return sprintf(format, ...args)
}

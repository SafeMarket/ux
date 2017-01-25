const getBlurbs = require('./getBlurbs')
const sprintf = require('sprintf-js').sprintf

module.exports = function getBlurb(id, _args) {
  const blurbs = getBlurbs()
  const args = _args || []
  const format = blurbs[id]
  return sprintf(format, ...args)
}

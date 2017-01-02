const blurbsPojo = require('../../generated/blurbsPojo.gs')

module.exports = function getBlurb(id) {
  return blurbsPojo[id].eng
}

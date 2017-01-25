const blurbsPojo = require('../../generated/blurbsPojo.gs')
const _ = require('lodash')

module.exports = function getBlurbs() {
  const blurbs = {}
  _.forEach(blurbsPojo, (blurb, id) => {
    blurbs[id] = blurb.eng
  })
  return blurbs
}

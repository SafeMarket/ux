const getBlurb = require('../utils/getBlurb')

module.exports = function blurbFilter() {
  return function blurbFilterFunction(id, ...args) {
    console.log('args', args)
    return getBlurb(id, args || [])
  }
}

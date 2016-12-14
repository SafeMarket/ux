const Blurb = require('../classes/Blurb')

module.exports = new Blurb('Looking up @%s', (alias) => {
  return [alias.to('ascii')]
})

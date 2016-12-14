const Blurb = require('../classes/Blurb')

module.exports = new Blurb('Could not find @%s', (alias) => {
  return [alias.to('ascii')]
})

const readAuthfile = require('../lib/utils/readAuthfile')

const authfile = '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'
const profiles = readAuthfile(authfile, 'passphrase')
module.exports = profiles

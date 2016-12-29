const fs = require('fs')

module.exports = JSON.parse(fs.readFileSync('.keys.json'))

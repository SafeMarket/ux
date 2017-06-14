const amorphParseSolcOutput = require('amorph-parse-solc-output')
const fs = require('fs')
const Amorph = require('./Amorph')
const path = require('path')

const contractsJson = fs.readFileSync(path.join(__dirname, '/../node_modules/safemarket-protocol/generated/contracts.json'))
module.exports = module.exports = amorphParseSolcOutput(JSON.parse(contractsJson), Amorph)

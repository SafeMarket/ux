const AliasReg = require('./classes/AliasReg')
const environment = require('./environment')

module.exports = new AliasReg(environment.contractAddresses.AliasReg)

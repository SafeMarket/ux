const Ticker = require('./classes/Ticker')
const environment = require('./environment')

module.exports = new Ticker(environment.contractAddresses.Ticker)

const currencySymbols = require('./currencySymbols.json')
const Amorph = require('./Amorph')

module.exports = currencySymbols.sort((a, b) => {
  return a.localeCompare(b)
}).map((symbol) => {
  return new Amorph(symbol, 'ascii')
})

const currenciesAscii = require('../generated/currenciesAscii.gs')
const Amorph = require('./classes/Amorph')

const currencies = {}

currenciesAscii.sort((a, b) => {
  return a.localeCompare(b)
}).forEach((currencyAscii) => {
  currencies[currencyAscii] = new Amorph(currencyAscii, 'ascii')
})

module.exports = currencies

const generateAuthfile = require('./generators/authfile')
const generateCurrenciesAscii = require('./generators/currenciesAscii')
const generatePricemorphPathsPojo = require('./generators/pricemorphPathsPojo')

generateAuthfile()
generateCurrenciesAscii().then(() => {
  generatePricemorphPathsPojo()
  process.exit()
})

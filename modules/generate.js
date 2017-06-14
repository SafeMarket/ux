const generateAuthfile = require('./generators/authfile')
const generateCurrenciesAscii = require('./generators/currenciesAscii')
const generatePricemorphPathsPojo = require('./generators/pricemorphPathsPojo')
const generateBlurbsPojo = require('./generators/blurbsPojo')

generateBlurbsPojo()
generateAuthfile()
generateCurrenciesAscii().then((currenciesAscii) => {
  console.log('a')
  generatePricemorphPathsPojo()
  console.log('b')
  process.exit()
})

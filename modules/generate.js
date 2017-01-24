const generateAuthfile = require('./generators/authfile')
const generateCurrenciesAscii = require('./generators/currenciesAscii')
const generatePricemorphPathsPojo = require('./generators/pricemorphPathsPojo')
const generateBlurbsPojo = require('./generators/blurbsPojo')
const generateProtofileUtf8 = require('./generators/protofileUtf8')

generateBlurbsPojo()
generateAuthfile()
generateProtofileUtf8()
generateCurrenciesAscii().then(() => {
  generatePricemorphPathsPojo()
  process.exit()
})

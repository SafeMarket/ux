const fs = require('fs')
const getApiPricemorphs = require('../getApiPricemorphs')

module.exports = function generateCurrenciesAscii() {
  const path = 'generated/currenciesAscii.gs'
  return getApiPricemorphs().then((pricemorphs) => {
    const currenciesAsciiJson = JSON.stringify(
      Object.keys(pricemorphs.crossConverter.forms), null, 2
    )
    fs.writeFileSync(path, `module.exports = ${currenciesAsciiJson}`)
    console.log(`Wrote currenciesAscii to ${path}`.green)
  })
}

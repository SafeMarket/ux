const fs = require('fs')
const getApiPricemorphs = require('../getApiPricemorphs')

module.exports = function generateCurrenciesAscii() {
  const path = 'generated/currenciesAscii.gs'
  return getApiPricemorphs().then((pricemorphs) => {
    console.log('pricmeorphs', pricemorphs)
    const currenciesAscii = Object.keys(pricemorphs)
    const currenciesAsciiJson = JSON.stringify(
      currenciesAscii, null, 2
    )
    fs.writeFileSync(path, `module.exports = ${currenciesAsciiJson}`)
    console.log(`Wrote currenciesAscii to ${path}`.green)
    return currenciesAscii
  })
}

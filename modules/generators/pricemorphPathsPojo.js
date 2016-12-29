const fs = require('fs')
const currenciesAscii = require('../../generated/currenciesAscii.gs')

const filePath = 'generated/pricemorphPathsPojo.gs'

module.exports = function writePricemorphsPathsJson() {

  const pricemorphPathsPojo = {}

  currenciesAscii.forEach((currencyAscii) => {
    pricemorphPathsPojo[currencyAscii] = {}
    currenciesAscii.forEach((_currencyAscii) => {
      if (currenciesAscii === _currencyAscii) {
        return
      }
      const path = ['WEI']
      if (currencyAscii !== 'WEI') {
        path.unshift(currencyAscii)
      }
      if (_currencyAscii !== 'WEI') {
        path.push(_currencyAscii)
      }
      pricemorphPathsPojo[currencyAscii][_currencyAscii] = path
    })
  })

  const pricemorphPathsPojoJson = JSON.stringify(pricemorphPathsPojo, null, 2)
  fs.writeFileSync(filePath, `module.exports = ${pricemorphPathsPojoJson}`)
  console.log(`Wrote pricemorphPathsPojo to ${filePath}`.green)
}

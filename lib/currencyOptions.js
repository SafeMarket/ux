const currencies = require('./currencies')
const CurrencyOption = require('./classes/CurrencyOption')
const _ = require('lodash')

const currencyOptions = {}
_.forEach(currencies, (currency, ascii) => {
  currencyOptions[ascii] = new CurrencyOption(currency)
})

module.exports = currencyOptions

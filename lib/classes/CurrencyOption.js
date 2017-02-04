module.exports = function CurrencyOption(currency) {
  this.currency = currency

  const currencyAscii = currency.to('ascii')
  this.label = currencyAscii[0] === '6' ? currencyAscii.substr(1) : currencyAscii
}

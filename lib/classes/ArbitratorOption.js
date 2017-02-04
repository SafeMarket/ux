const settingsManager = require('../settingsManager')

function ArbitratorOption(arbitrator) {
  this.arbitrator = arbitrator
}

ArbitratorOption.prototype.getLabel = function getLabel() {
  if (!this.arbitrator) {
    return 'No arbitrator'
  }
  const currencyAscii = settingsManager.get().currency.to('ascii')
  const feeBaseString = this.arbitrator.feeBase.to(currencyAscii).to('bignumber').toFixed(2)
  return `${this.arbitrator.name} - ${feeBaseString} ${currencyAscii} + ${this.arbitrator.feeCentiperun.to('number.string')}%`
}

module.exports = ArbitratorOption

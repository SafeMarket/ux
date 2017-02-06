const settingsManager = require('../settingsManager')
const Amorph = require('../classes/Amorph')

function ArbitratorOption(arbitrator) {
  this.arbitrator = arbitrator
  if (arbitrator === null) {
    this.address = new Amorph(0, 'number')
  } else {
    this.address = arbitrator.address
  }
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

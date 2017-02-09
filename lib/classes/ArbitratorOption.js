const Amorph = require('../classes/Amorph')
const getPricemorphLabel = require('../utils/getPricemorphLabel')
const getPerunLabel = require('../utils/getPerunLabel')

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
  return `${this.arbitrator.name} - ${getPricemorphLabel(this.arbitrator.feeBase)} + ${getPerunLabel(this.arbitrator.feeMicroperun, -6)}`
}

module.exports = ArbitratorOption

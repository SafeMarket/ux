const Amorph = require('./Amorph')

function DisputeSecondsOption(seconds, label) {
  this.seconds = new Amorph(seconds, 'number')
  this.label = label
}

module.exports = DisputeSecondsOption

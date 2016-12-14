const sprintf = require('sprintf-js').sprintf

function Blurb(format, formatter) {
  this.format = format
  this.formatter = formatter
  this.inputs = []
}

Blurb.prototype.withInputs = function withInputs(...args) {
  this.inputs = args
  return this
}

Blurb.prototype.toString = function toString() {
  const args = this.formatter ?
    this.formatter(...this.inputs)
    : []
  return sprintf(this.format, ...args)
}

module.exports = Blurb

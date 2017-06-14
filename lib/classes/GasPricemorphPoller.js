const ultralightbeam = require('../ultralightbeam')
const Pricemorph = require('./Pricemorph')
const EventEmitter = require('events')

module.exports = function GasPricemorphPoller() {
  if (ultralightbeam.blockPoller.gasPrice) {
    this.gasPricemorph = new Pricemorph(ultralightbeam.blockPoller.gasPrice, 'WEI')
  }
  this.emitter = new EventEmitter()
  ultralightbeam.blockPoller.emitter.on('gasPrice', (gasPrice) => {
    const gasPricemorph = new Pricemorph(gasPrice, 'WEI')
    this.gasPricemorph = gasPricemorph
    this.emitter.emit('gasPricemorph', gasPricemorph)
  })
}

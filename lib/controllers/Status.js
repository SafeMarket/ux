const ultralightbeam = require('../ultralightbeam')
const pricemorphsPoller = require('../pricemorphsPoller')
const Pricemorph = require('../classes/Pricemorph')
const Amorph = require('../classes/Amorph')
const settingsManager = require('../settingsManager')

module.exports = function StatusController($scope, $interval) {

  $scope.currencyAscii = settingsManager.get().currency.to('ascii')

  ultralightbeam.blockPoller.emitter.on('block', (block) => {
    $scope.block = block
  })

  pricemorphsPoller.emitter.on('pricemorphs', () => {
    const one = new Amorph(1, 'number')
    const pricemorph = new Pricemorph(one, 'ETH')
    $scope.priceOfEthInCurrencyNumber = pricemorph.to($scope.currencyAscii).to('number')
  })

  settingsManager.emitter.on('settings', (settings) => {
    $scope.currencyAscii = settings.currency.to('ascii')
  })

  $interval(() => {
    if (!$scope.block) { return }
    $scope.blockSecondsAgo = Math.round(
      ((new Date()) / 1000)
      - $scope.block.timestamp.to('number')
    )
  }, 1000)
}

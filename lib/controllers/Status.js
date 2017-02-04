const ultralightbeam = require('../ultralightbeam')
const settingsManager = require('../settingsManager')

module.exports = function StatusController($scope, $interval) {

  const settings = settingsManager.get()

  $scope.currencyAscii = settings.currency.to('ascii')
  $scope.block = ultralightbeam.blockPoller.block

  ultralightbeam.blockPoller.emitter.on('block', (block) => {
    $scope.block = block
  })

  $interval(() => {
    if (!$scope.block) { return }
    $scope.blockSecondsAgo = Math.round(
      ((new Date()) / 1000)
      - $scope.block.timestamp.to('number')
    )
  }, 1000)
}

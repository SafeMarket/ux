const pricemorphPoller = require('../pricemorphsPoller')
const settingsManager = require('../settingsManager')
const getPricemorphLabel = require('../utils/getPricemorphLabel')

module.exports = function pricemorphDirective() {
  return {
    scope: {
      pricemorph: '=pricemorph',
      currency: '=?currency'
    },
    templateUrl: 'html/pricemorph.html',
    link: function pricemorphDirectiveLink($scope) {
      console.log($scope)
      console.log(pricemorphPoller)

      $scope.isPricemorphReady = pricemorphPoller.isReady

      if (!$scope.currency) {
        $scope.currency = settingsManager.get().currency
      }

      function update() {
        if (!$scope.currency || !$scope.pricemorph || !pricemorphPoller.isReady) {
          return
        }
        $scope.pricemorphLabel = getPricemorphLabel($scope.pricemorph, $scope.currency)
      }

      const onPricemorphsPollerUpdate = () => {
        $scope.isPricemorphReady = true
        update()
        $scope.$apply()
      }

      pricemorphPoller.emitter.on('update', onPricemorphsPollerUpdate)
      $scope.$watchGroup(['currency', 'pricemorph'], update)

      $scope.$on('$destroy', () => {
        pricemorphPoller.emitter.removeListener('pricemorphs', onPricemorphsPollerUpdate)
      })
    }
  }
}

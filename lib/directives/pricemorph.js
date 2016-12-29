const pricemorphPoller = require('../pricemorphsPoller')
const settingsManager = require('../settingsManager')

module.exports = function pricemorphDirective() {
  return {
    scope: {
      pricemorph: '=pricemorph',
      currency: '=?currency'
    },
    templateUrl: 'html/pricemorph.html',
    link: function pricemorphDirectiveLink($scope, $element) {

      $scope.isPricemorphReady = pricemorphPoller.isReady

      if (!$scope.currency) {
        $scope.currency = settingsManager.get().currency
      }

      $scope.$watchGroup(['currency', 'pricemorph'], (results) => {
        const currency = results[0]
        const pricemorph = results[1]
        if (!currency || !pricemorph || !$scope.pricemorphIsReady) {
          return
        }
        const currencyAscii = currency.to('ascii')
        $scope.rateCurrency = pricemorph.to(currencyAscii)
        $scope.rateETH = pricemorph.to('ETH')
      })

      const onPricemorphs = () => {
        $scope.isPricemorphReady = true
        $scope.$apply()
      }

      pricemorphPoller.emitter.on('pricemorphs', onPricemorphs)

      $scope.$on('$destroy', () => {
        pricemorphPoller.emitter.removeListener('pricemorphs', onPricemorphs)
      })
    }
  }
}

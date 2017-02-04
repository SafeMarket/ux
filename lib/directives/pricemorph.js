const pricemorphPoller = require('../pricemorphsPoller')
const settingsManager = require('../settingsManager')
const MICRO = require('../constants/MICRO')

module.exports = function pricemorphDirective() {
  return {
    scope: {
      pricemorph: '=pricemorph',
      currency: '=?currency'
    },
    templateUrl: 'html/pricemorph.html',
    link: function pricemorphDirectiveLink($scope) {

      $scope.isPricemorphReady = pricemorphPoller.isReady

      if (!$scope.currency) {
        $scope.currency = settingsManager.get().currency
      }

      function update() {
        if (!$scope.currency || !$scope.pricemorph || !pricemorphPoller.isReady) {
          return
        }
        const currencyAscii = $scope.currency.to('ascii')
        const pricemorph = $scope.pricemorph
        if (currencyAscii[0] !== '6') {
          $scope.pricemorphLabel = `${pricemorph.to(currencyAscii).to('bignumber').round(2)} ${currencyAscii}`
        } else {
          const pricemorphBignumber = pricemorph.to(currencyAscii).to('bignumber').times(MICRO).round(2)
          $scope.pricemorphLabel = `${pricemorphBignumber.round(2)} ${currencyAscii.substr(1)}`
        }
      }

      const onPricemorphs = () => {
        $scope.isPricemorphReady = true
        update()
        $scope.$apply()
      }

      pricemorphPoller.emitter.on('pricemorphs', onPricemorphs)
      $scope.$watchGroup(['currency', 'pricemorph'], update)

      $scope.$on('$destroy', () => {
        pricemorphPoller.emitter.removeListener('pricemorphs', onPricemorphs)
      })
    }
  }
}

const settingsManager = require('../settingsManager')

module.exports = function pricemorphInputGroupDirective() {
  return {
    templateUrl: 'html/pricemorphInputGroup.html',
    scope: {
      pricemorph: '=pricemorphInputGroup',
      currency: '=?currency'
    },
    link: function link($scope) {

      const settings = settingsManager.get()

      $scope.$watch('currency', (_currency) => {
        $scope.currency = _currency || settings.currency
        if ($scope.pricemorph) {
          $scope.pricemorph.numerator = $scope.currency.to('ascii')
        }
      })
    }
  }
}

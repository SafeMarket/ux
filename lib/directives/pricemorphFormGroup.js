module.exports = function pricemorphFormGroupDirective() {
  return {
    priority: 10,
    scope: {
      pricemorphModel: '=',
      currency: '='
    },
    templateUrl: 'html/pricemorphFormGroup.html',
    link: ($scope) => {
      $scope.$watch('currency', (currency) => {
        if (!currency || !$scope.pricemorphModel) {
          return
        }
        $scope.pricemorphModel.numerator = currency.to('ascii')
      })
    }
  }
}

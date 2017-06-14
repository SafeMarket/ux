module.exports = function quantitySelectDirective() {
  return {
    scope: {
      quantity: '=quantitySelect'
    },
    templateUrl: '/html/quantitySelect.html',
    link: ($scope) => {
      if ($scope.quantity === undefined) {
        $scope.quantity = 0
      }
    }
  }
}

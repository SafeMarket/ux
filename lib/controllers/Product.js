const Amorph = require('../classes/Amorph')
const cart = require('../cart')
const storeManager = require('../storeManager')

module.exports = function ProductController($scope, $stateParams, toaster) {
  $scope.quantityNumber = 1
  const indexNumber = parseInt($stateParams.indexNumberString, 10)
  const storeId = new Amorph($stateParams.idAscii, 'ascii')
  storeManager.get(storeId).then((store) => {
    $scope.store = store
    $scope.product = $scope.store.products[indexNumber]
  })
  $scope.addToCart = function addToCart() {
    toaster.pop({ type: 'success', body: `Added ${$scope.product.name.to('ascii')} x${$scope.quantityNumber}` })
    cart.add($scope.store, indexNumber, $scope.quantityNumber)
  }
}

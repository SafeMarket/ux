const cart = require('../cart')
const arguguard = require('arguguard')

module.exports = function StoreProductsController($scope, toaster, $state) {
  console.log('StoreProductsController', $scope)
  $scope.addToCart = function addToCart(productIndexNumber) {
    const product = $scope.store.products[productIndexNumber]
    toaster.pop({ type: 'success', body: `Added ${product.name.to('ascii')} to cart` })
    cart.add($scope.store, productIndexNumber, 1)
  }

  $scope.goToProduct = function goToProduct(productIndex) {
    $state.go('store.product', {
      store: $scope.store,
      idAscii: $scope.store.id.to('ascii.stripped'),
      indexNumberString: productIndex.toString()
    })
  }
}

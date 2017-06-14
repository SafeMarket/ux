const cart = require('../cart')

module.exports = function CartController($scope) {
  $scope.totalQuantityNumber = 0
  cart.emitter.on('update', () => {
    $scope.totalQuantityNumber = cart.getTotalQuantityNumber()
    $scope.totalPricemorph = cart.getTotalPricemorph()
  })
  cart.promise.then(() => {
    $scope.quantities = cart.quantities
    $scope.store = cart.store
    $scope.totalQuantityNumber = cart.getTotalQuantityNumber()
    $scope.totalPricemorph = cart.getTotalPricemorph()
    $scope.$apply()
  })
  $scope.$watch('quantities', (quantities) => {
    if (cart.getTotalQuantityNumber() === 0) { return }
    cart.emitter.emit('update')
  }, true)
  $scope.remove = function remove(productIndex) {
    console.log('remove', remove)
    delete $scope.quantities[productIndex]
    cart.emitter.emit('update')
  }
}

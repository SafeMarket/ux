const cart = require('../cart')
const MICRO = require('../constants/MICRO')

module.exports = function CheckoutContoller($scope) {
  cart.emitter.on('update', () => {
    $scope.totalQuantityNumber = cart.getTotalQuantityNumber()
    $scope.totalPricemorph = cart.getTotalPricemorph()
  })
  cart.promise.then(() => {
    $scope.quantities = cart.quantities
    $scope.store = cart.store
    $scope.totalQuantityNumber = cart.getTotalQuantityNumber()
    $scope.transport = cart.store.transports[0]
    $scope.$apply()
  })

  $scope.$watch('transport', (transport) => {
    if (!transport) { return }
    const cartTotalPricemorph = cart.getTotalPricemorph()
    const buffer = cartTotalPricemorph.times($scope.store.meta.value.bufferMicroperun).times(MICRO)
    $scope.buffer = buffer
    $scope.totalPricemorph = cartTotalPricemorph.plus(buffer).plus(transport.pricemorph)
  })
}

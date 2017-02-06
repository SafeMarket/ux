const Order = require('../classes/Order')
const solWrappers = require('../solWrappers')
const Amorph = require('../classes/Amorph')

module.exports = function OrderController($scope, $state) {
  const orderId = new Amorph($state.params.orderIdNumber, 'number')
  $scope.order = new Order(solWrappers.OrderReg, orderId)
}

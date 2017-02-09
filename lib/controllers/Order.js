const Order = require('../classes/Order')
const solWrappers = require('../solWrappers')
const Amorph = require('../classes/Amorph')

module.exports = function OrderController($scope, $state, transactionManager) {
  const orderId = new Amorph($state.params.orderIdNumber, 'number')
  $scope.order = new Order(solWrappers.OrderReg, orderId)

  const label = `Order #${orderId.to('number')}`

  $scope.setStatusToCancelled = function setStatusToCancelled() {
    const transactionRequest = solWrappers.OrderReg.getTransactionRequest('setStatusToCancelled(uint256)', [orderId])
    transactionManager.request(`Cancel ${label}`, transactionRequest)
  }

  $scope.setStatusToShipped = function setStatusToShipped() {
    const calldata = solWrappers.OrderReg.getCalldata('setStatusToShipped(uint256)', [orderId])
    const transactionRequest = $scope.order.store.getTransactionRequest('execute(address,uint256[],bytes)', [
      $scope.order.orderReg.address,
      [new Amorph(calldata.to('array').length, 'number')],
      calldata
    ])
    transactionManager.request(`Mark ${label} as Shipped`, transactionRequest)
  }

  $scope.payoutStore = function payoutStore() {
    const transactionRequest = solWrappers.OrderReg.getTransactionRequest('withdrawAsBuyer(uint256)', [orderId])
    transactionManager.request(`Withdraw Funds from ${label}`, transactionRequest)
  }

  $scope.payoutStore = function payoutStore() {
    const calldata = solWrappers.OrderReg.getCalldata('withdrawAsStore(uint256)', [orderId])
    const transactionRequest = $scope.order.store.getTransactionRequest('execute(address,uint256[],bytes)', [
      $scope.order.orderReg.address,
      [new Amorph(calldata.to('array').length, 'number')],
      calldata
    ])
    transactionManager.request(`Withdraw Funds from ${label}`, transactionRequest)
  }
}

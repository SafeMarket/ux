const Order = require('../classes/Order')
const solWrappers = require('../solWrappers')
const Amorph = require('../classes/Amorph')
const disputeSecondsOptions = require('../disputeSecondsOptions')

module.exports = function OrderController($scope, $state, transactionManager, $uibModal) {
  const orderId = new Amorph($state.params.orderIdNumber, 'number')
  const order = $scope.order = new Order(solWrappers.OrderReg, orderId)

  $scope.order.promise.then(() => {
    $scope.disputeSecondsOption = disputeSecondsOptions[$scope.order.disputeSeconds.to('number')]
  })


  $scope.setStatusToCancelled = function setStatusToCancelled() {
    const transactionRequest = solWrappers.OrderReg.getTransactionRequest('setStatusToCancelled(uint256)', [orderId])
    transactionManager.request(`Cancel ${order.label}`, transactionRequest).then(() => {
      order.download()
    })
  }

  $scope.setStatusToShipped = function setStatusToShipped() {
    const calldata = solWrappers.OrderReg.getCalldata('setStatusToShipped(uint256)', [orderId])
    const transactionRequest = $scope.order.store.getTransactionRequest('execute(address,uint256[],bytes)', [
      $scope.order.orderReg.address,
      [new Amorph(calldata.to('array').length, 'number')],
      calldata
    ])
    transactionManager.request(`Mark ${order.label} as Shipped`, transactionRequest).then(() => {
      order.download()
    })
  }

  $scope.setStatusToDisputed = function setStatusToDisputed() {
    const transactionRequest = solWrappers.OrderReg.getTransactionRequest('setStatusToDisputed(uint256)', [orderId])
    transactionManager.request(`Dispute ${order.label}`, transactionRequest).then(() => {
      order.download()
    })
  }

  $scope.payoutStore = function payoutStore() {
    const transactionRequest = solWrappers.OrderReg.getTransactionRequest('withdrawAsBuyer(uint256)', [orderId])
    transactionManager.request(`Withdraw Funds from ${order.label}`, transactionRequest).then(() => {
      order.download()
    })
  }

  $scope.payoutStore = function payoutStore() {
    const calldata = solWrappers.OrderReg.getCalldata('withdrawAsStore(uint256)', [orderId])
    const transactionRequest = $scope.order.store.getTransactionRequest('execute(address,uint256[],bytes)', [
      $scope.order.orderReg.address,
      [new Amorph(calldata.to('array').length, 'number')],
      calldata
    ])
    transactionManager.request(`Withdraw Funds from ${order.label}`, transactionRequest).then(() => {
      order.download()
    })
  }

  $scope.openDisputeResolutionModal = function openDisputeResolutionModal() {
    return $uibModal.open({
      controller: 'DisputeResolutionModal',
      templateUrl: 'html/disputeResolutionModal.html',
      resolve: {
        order: () => {
          return $scope.order
        }
      }
    })
  }
}

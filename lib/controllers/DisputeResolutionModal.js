const MICRO = require('../constants/MICRO')
const Amorph = require('../classes/Amorph')

module.exports = function DisputeResolutionModalController(
  $scope, order, transactionManager, $uibModalInstance
) {
  $scope.order = order
  $scope.storePayoutMicroperun = new Amorph(MICRO.pow(-1).times(0.5), 'bignumber')
  $scope.$watch('storePayoutMicroperun', () => {
    $scope.buyerPayoutMicroperun = $scope.storePayoutMicroperun.as('bignumber', (bignumber) => {
      return MICRO.pow(-1).minus(bignumber)
    })
  })

  $scope.submit = function submit() {
    const calldata = order.orderReg.getCalldata('setStatusToDisputeResolved(uint256,uint256)', [
      order.id, $scope.storePayoutMicroperun
    ])
    const transactionRequest = order.arbitrator.getTransactionRequest('execute(address,uint256[],bytes)', [
      order.orderReg.address, [new Amorph(calldata.to('array').length, 'number')], calldata
    ])
    transactionManager.request(`Resolve ${order.label}`, transactionRequest).then(() => {
      $uibModalInstance.close()
    })
  }

  $scope.cancel = function cancel() {
    $uibModalInstance.dismiss()
  }
}

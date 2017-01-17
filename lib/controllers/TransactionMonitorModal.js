module.exports = function TransactionMonitor(
  $scope,
  $uibModalInstance,
  title,
  transactionHashPromiseWrapper,
  transactionPromiseWrapper
) {

  $scope.title = title

  transactionHashPromiseWrapper().then((transactionHash) => {
    $scope.transactionHash = transactionHash
  }, (error) => {
    $scope.error = error
  })

  transactionPromiseWrapper().then((transaction) => {
    $scope.isMined = true
    $scope.minedBlockNumber = transaction.blockNumber
  }, (error) => {
    $scope.error = error
  })

  $scope.submit = function submit() {
    $uibModalInstance.close()
  }

  $scope.cancel = function submit() {
    $uibModalInstance.dismiss()
  }

}

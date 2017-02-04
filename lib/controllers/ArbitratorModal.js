const currencyOptions = require('../currencyOptions')
const getBlurb = require('../utils/getBlurb')
const ipfsAmorphApi = require('../ipfsAmorphApi')
const parseMultiproxTransactionReceipt = require('../utils/parseMultiproxTransactionReceipt')
const NoUpdatesError = require('../errors/NoUpdates')


module.exports = function ArbitratorModalController(
  $scope, arbitrator, $uibModal, growl, transactionManager, $uibModalInstance, $state
) {

  $scope.currencyOptions = currencyOptions
  $scope.arbitrator = arbitrator

  $scope.submit = function submit() {

    const arbitratorMetaFile = arbitrator.getMetaFile()

    growl.info(getBlurb('uploading_files_to_ipfs', [1]))
    ipfsAmorphApi.addFile(arbitratorMetaFile).then(() => {
      growl.success(getBlurb('uploaded_files_to_ipfs', [1]))
      let transactionRequest
      try {
        transactionRequest = arbitrator.getTransactionRequest()
      } catch (err) {
        if (err instanceof NoUpdatesError) {
          return growl.error(getBlurb('no_updates'))
        }
        throw err
      }
      transactionManager.request('Create An Arbitrator', transactionRequest, 2).then((transactionReceipt) => {
        $uibModalInstance.close()
        const parsed = parseMultiproxTransactionReceipt(transactionReceipt)
        const contractAddressHexPrefixed = parsed.contractAddress.to('hex.prefixed')
        growl.success(getBlurb('created_arbitrator', [contractAddressHexPrefixed]))
        $state.go('arbitrator.about', {
          slug: `@${$scope.arbitrator.alias.to('ascii')}`
        })
      })
    })
  }

  $scope.cancel = function cancel() {
    $uibModalInstance.dismiss()
  }

  $scope.deleteApprovedStoreAlias = function deleteApprovedStoreAlias(index) {
    $scope.arbitrator.approvedStoreAliases.splice(index, 1)
  }

}

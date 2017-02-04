const currencyOptions = require('../currencyOptions')
const disputeSecondsOptions = require('../disputeSecondsOptions')
const getBlurb = require('../utils/getBlurb')
const ipfsAmorphApi = require('../ipfsAmorphApi')
const parseMultiproxTransactionReceipt = require('../utils/parseMultiproxTransactionReceipt')
const NoUpdatesError = require('../errors/NoUpdates')


module.exports = function StoreModalController(
  $scope, store, $uibModal, growl, transactionManager, $uibModalInstance, $state
) {

  $scope.disputeSecondsOptions = disputeSecondsOptions

  $scope.currencyOptions = currencyOptions
  $scope.store = store

  $scope.submit = function submit() {

    const storeMetaFile = store.getMetaFile()

    growl.info(getBlurb('uploading_files_to_ipfs', [1]))
    ipfsAmorphApi.addFile(storeMetaFile).then(() => {
      growl.success(getBlurb('uploaded_files_to_ipfs', [1]))
      let transactionRequest
      try {
        transactionRequest = store.getTransactionRequest()
      } catch (err) {
        if (err instanceof NoUpdatesError) {
          return growl.error(getBlurb('no_updates'))
        }
        throw err
      }
      transactionManager.request('Create A Store', transactionRequest, 2).then((transactionReceipt) => {
        $uibModalInstance.close()
        const parsed = parseMultiproxTransactionReceipt(transactionReceipt)
        const contractAddressHexPrefixed = parsed.contractAddress.to('hex.prefixed')
        growl.success(getBlurb('created_store', [contractAddressHexPrefixed]))
        $state.go('store.about', {
          slug: `@${$scope.store.alias.to('ascii')}`
        })
      })
    })
  }

  $scope.deleteApprovedArbitratorAlias = function deleteApprovedArbitratorAlias(index) {
    $scope.store.approvedArbitratorAliases.splice(index, 1)
  }

  $scope.cancel = function cancel() {
    $uibModalInstance.dismiss()
  }

}

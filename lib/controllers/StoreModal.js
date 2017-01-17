const currencies = require('../currencies')
const disputeSecondsOptions = require('../disputeSecondsOptions')
const getBlurb = require('../utils/getBlurb')
const ipfs = require('../ipfs')
const parseMultiproxTransactionReceipt = require('../utils/parseMultiproxTransactionReceipt')

module.exports = function StoreModalController(
  $scope, store, $uibModal, growl, transactionManager, $uibModalInstance, $state
) {

  $scope.disputeSecondsOptions = disputeSecondsOptions

  $scope.currencies = currencies
  $scope.store = store

  $scope.submit = function submit() {

    const storeMeta = store.getMeta()
    const files = [storeMeta]

    growl.info(getBlurb('uploading_files_to_ipfs', [files.length]))

    ipfs.uploadFiles(files).then(() => {
      growl.success(getBlurb('uploaded_files_to_ipfs', [files.length]))
      const transactionRequest = store.getTransactionRequest()
      transactionManager.request('Create A Store', transactionRequest, 2).then((transactionReceipt) => {
        $uibModalInstance.close()
        const parsed = parseMultiproxTransactionReceipt(transactionReceipt)
        const contractAddressHexPrefixed = parsed.contractAddress.to('hex.prefixed')
        growl.success(getBlurb('created_store', [contractAddressHexPrefixed]))
        $state.go('address', {
          addressHexPrefixed: contractAddressHexPrefixed
        })
      })
    })
  }

  $scope.cancel = function cancel() {
    $uibModalInstance.dismiss()
  }

}

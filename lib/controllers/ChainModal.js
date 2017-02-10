const ultralightbeam = require('../ultralightbeam')
const HttpProvider = require('web3/lib/web3/httpprovider')

module.exports = function ChainModalController($scope, $uibModalInstance) {
  $scope.rpcUrl = localStorage.getItem('rpcUrl') || 'https://ropsten.infura.io/bvPKyTSGGaeekwhJ8Mnn'

  $scope.submit = function submit() {
    localStorage.setItem('rpcUrl', $scope.rpcUrl)
    ultralightbeam.provider = new HttpProvider($scope.rpcUrl)
    $uibModalInstance.close()
  }
}

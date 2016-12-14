const ultralightbeam = require('../ultralightbeam')
const HttpProvider = require('web3/lib/web3/httpprovider')

module.exports = function ChainModalController($scope, $uibModalInstance) {
  $scope.rpcUrl = localStorage.getItem('rpcUrl') || 'http://localhost:8545'

  $scope.submit = function submit() {
    localStorage.setItem('rpcUrl', $scope.rpcUrl)
    ultralightbeam.provider = new HttpProvider($scope.rpcUrl)
    $uibModalInstance.close()
  }
}

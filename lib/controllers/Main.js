const Store = require('../classes/Store')
const Arbitrator = require('../classes/Arbitrator')

module.exports = function MainController($scope, $timeout, $rootScope, $uibModal, loginManager) {

  $scope.goBack = function goBack() {
    window.history.back()
  }

  $scope.openChainModal = function openChainModal() {
    $uibModal.open({
      templateUrl: 'html/chainModal.html',
      controller: 'ChainModal'
    })
  }

  $scope.openSettingsModal = function openSettingsModal() {
    $uibModal.open({
      templateUrl: 'html/settingsModal.html',
      controller: 'SettingsModal'
    })
  }

  $scope.openStoreModal = function openSettingsModal() {
    loginManager.requireLogin().then(() => {
      $uibModal.open({
        templateUrl: 'html/storeModal.html',
        controller: 'StoreModal',
        resolve: {
          store: function resolveStore() {
            return new Store()
          }
        }
      })
    })
  }

  $scope.openArbitratorModal = function openArbitratorModal() {
    loginManager.requireLogin().then(() => {
      $uibModal.open({
        templateUrl: 'html/arbitratorModal.html',
        controller: 'ArbitratorModal',
        resolve: {
          arbitrator: function resolveArbitrator() {
            return new Arbitrator()
          }
        }
      })
    })
  }

}

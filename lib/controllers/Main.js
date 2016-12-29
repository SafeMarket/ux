module.exports = function MainController($scope, $timeout, $rootScope, $uibModal) {

  $scope.goBack = function goBack() {
    window.history.back()
  }

  $scope.openChainModal = function openChainModal() {
    $uibModal.open({
      templateUrl: 'html/chainModal.html',
      controller: 'ChainModal'
    })
  }

  $scope.openRegisterModal = function openRegisterModal() {
    $uibModal.open({
      templateUrl: 'html/registerModal.html',
      controller: 'RegisterModal'
    })
  }

  $scope.openSettingsModal = function openSettingsModal() {
    $uibModal.open({
      templateUrl: 'html/settingsModal.html',
      controller: 'Settings'
    })
  }

}

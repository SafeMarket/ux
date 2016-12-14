const ultralightbeam = require('../ultralightbeam')

module.exports = function MainController($scope, $timeout, $rootScope, $uibModal, $interval) {

  (function watchBlock() {
    ultralightbeam.blockPoller.promise.then((block) => {
      $scope.block = block
      $scope.$apply()
      watchBlock()
    })
  }())

  $interval(() => {
    if (!$scope.block) { return }
    $scope.blockSecondsAgo = Math.round(
      ((new Date()) / 1000)
      - $scope.block.timestamp.to('number')
    )
  }, 1000)

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

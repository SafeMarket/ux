const getAddressForSlug = require('../utils/getAddressForSlug')
const Arbitrator = require('../classes/Arbitrator')
const _ = require('lodash')

module.exports = function ArbitratorController($scope, $stateParams, $state, $uibModal) {

  $scope.slug = $stateParams.slug

  getAddressForSlug($scope.slug).then((address) => {
    $scope.arbitrator = new Arbitrator(address)
  })

  $scope.tabs = [
    { heading: 'About', route: 'arbitrator.about' },
    { heading: 'Orders', route: 'arbitrator.orders' }
  ]
  $scope.tabs.forEach((tab, index) => {
    if ($state.is(tab.route)) {
      $scope.activeTabIndex = index
    }
  })

  console.log(JSON.stringify($scope.tabs))

  $scope.go = function go(route) {
    $state.go(route)
  }

  $scope.edit = function edit() {
    $uibModal.open({
      controller: 'ArbitratorModal',
      templateUrl: 'html/arbitratorModal.html',
      resolve: {
        arbitrator: () => {
          return $scope.arbitrator
        }
      }
    }).result.finally(() => {
      $scope.arbitrator.download()
    })
  }
}

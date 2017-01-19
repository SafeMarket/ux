const getAddressForSlug = require('../utils/getAddressForSlug')
const Store = require('../classes/Store')
const _ = require('lodash')

module.exports = function StoreController($scope, $stateParams, $state, $uibModal) {

  $scope.slug = $stateParams.slug

  getAddressForSlug($scope.slug).then((address) => {
    $scope.store = new Store(address)
  })

  $scope.tabs = [
    { heading: 'About', route: 'store.about' },
    { heading: 'Products', route: 'store.products' },
    { heading: 'Orders', route: 'store.orders' }
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

  $scope.editStore = function editStore() {
    $uibModal.open({
      controller: 'StoreModal',
      templateUrl: 'html/storeModal.html',
      resolve: {
        store: () => {
          return $scope.store
        }
      }
    }).result.finally(() => {
      $scope.store.download()
    })
  }
}

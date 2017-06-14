const Amorph = require('../classes/Amorph')
const storeManager = require('../storeManager')

module.exports = function StoreController($scope, $stateParams, $state, $uibModal) {

  const storeId = new Amorph($stateParams.idAscii, 'ascii')

  storeManager.get(storeId).then((store) => {
    $scope.store = store
    $scope.$apply()
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

  $scope.go = function go(route) {
    $state.go(route)
  }

}

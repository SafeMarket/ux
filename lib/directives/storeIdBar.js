const solWrappers = require('../solWrappers')

module.exports = function storeIdBarDirective($state, toaster) {
  return {
    templateUrl: 'html/storeIdBar.html',
    scope: { storeId: '=storeIdBar' },
    link: ($scope) => {
      $scope.submit = function submit() {
        const storeId = $scope.storeId
        toaster.pop({
          type: 'info',
          body: `Looking up ${$scope.storeId.to('ascii')}`
        })
        solWrappers.StoreReg.fetch('stores(bytes32)', [storeId]).then((store) => {
          if (store.owner.to('bignumber').eq(0)) {
            return toaster.pop({
              type: 'error',
              body: `${storeId.to('ascii')} has not been registered`
            })
          }
          toaster.pop({
            type: 'success',
            body: `Loading store ${storeId.to('ascii')}`
          })
          $state.go('store.products', {
            idAscii: storeId.to('ascii')
          })
        })
      }
    }
  }
}

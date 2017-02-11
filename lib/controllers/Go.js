const getAddressForSlug = require('../utils/getAddressForSlug')
const getTypesForAddress = require('../utils/getTypesForAddress')

module.exports = function GoController($scope, $state, growl) {
  $scope.slug = $state.params.slug
  getAddressForSlug($state.params.slug).then((address) => {
    getTypesForAddress(address).then((types) => {
      if (types.store) {
        $state.go('store.about', {
          slug: $state.params.slug
        })
        growl.success('Found store!')
      } else if (types.arbitrator) {
        $state.go('arbitrator.about', {
          slug: $state.params.slug
        })
        growl.success('Found arbitrator!')
      } else {
        growl.error('Fail')
      }
    })
  })
}

const getAddressForAlias = require('../utils/getAddressForAlias')
const getBlurb = require('../utils/getBlurb')
const getTypesForAddress = require('../utils/getTypesForAddress')

function AliasBarController($scope, growl, $state) {
  $scope.submit = function submit() {

    const alias = $scope.alias
    const aliasAscii = alias.to('ascii')

    if (alias.to('ascii').length === 0) {
      return
    }

    growl.info(getBlurb('looking_up_alias', [aliasAscii]))

    getAddressForAlias($scope.alias).then((address) => {
      if (address === null) {
        growl.error(getBlurb('could_not_find_alias', [aliasAscii]))
        return
      }
      getTypesForAddress(address).then((types) => {
        if (types.store) {
          $state.go('store.about', {
            slug: `@${$scope.alias.to('ascii')}`
          })
          growl.success('Found store!')
        } else if (types.arbitrator) {
          $state.go('arbitrator.about', {
            slug: `@${$scope.alias.to('ascii')}`
          })
          growl.success('Found arbitrator!')
        } else {
          growl.error(getBlurb('could_not_find_alias', [aliasAscii]))
        }
      })
    })

  }
}

module.exports = function aliasBarDirective() {
  return {
    templateUrl: 'html/aliasBar.html',
    scope: { alias: '=aliasBar' },
    controller: AliasBarController
  }
}

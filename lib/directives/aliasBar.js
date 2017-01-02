const getAddressForAlias = require('../utils/getAddressForAlias')
const getBlurb = require('../utils/getBlurb')

function AliasBarController($scope, growl) {
  $scope.submit = function submit() {

    const alias = $scope.alias

    if (alias.to('ascii').length === 0) {
      return
    }

    growl.info(getBlurb('looking_up_alias'))

    getAddressForAlias($scope.alias).then((address) => {
      if (address === null) {
        growl.error(getBlurb('could_not_find_alias'))
      }
    })

  }
}

module.exports = function aliasBarDirective() {
  return {
    templateUrl: 'html/bar.html',
    scope: { alias: '@aliasBar' },
    controller: AliasBarController
  }
}

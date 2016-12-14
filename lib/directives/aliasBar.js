const getAddressForAlias = require('../utils/getAddressForAlias')
const couldNotFindAliasBlurb = require('../blurbs/couldNotFindAlias')
const lookingUpAliasBlurb = require('../blurbs/lookingUpAlias')

function AliasBarController($scope, growl) {
  $scope.submit = function submit() {

    const alias = $scope.alias

    if (alias.to('ascii').length === 0) {
      return
    }

    growl.info(lookingUpAliasBlurb.withInputs(alias).toString())

    getAddressForAlias($scope.alias).then((address) => {
      if (address === null) {
        growl.error(couldNotFindAliasBlurb.withInputs(alias).toString())
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

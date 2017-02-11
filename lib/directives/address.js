const getAliasForAddress = require('../utils/getAliasForAddress')

module.exports = function addressDirective($state) {
  return {
    templateUrl: 'html/address.html',
    scope: {
      address: '='
    },
    link: function addressLink($scope) {
      $scope.$watch('address', (address) => {
        if (!address) {
          return
        }
        $scope.href = $state.href('go', { slug: address.to('hex.prefixed') })
        getAliasForAddress(address).then((alias) => {
          $scope.href = $state.href('go', { slug: `@${alias.to('ascii')}` })
          $scope.alias = alias
        })
      })
    }
  }
}

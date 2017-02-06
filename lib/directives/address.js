const getAliasForAddress = require('../utils/getAliasForAddress')

module.exports = function addressDirective() {
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
        getAliasForAddress(address).then((alias) => {
          $scope.alias = alias
        })
      })
    }
  }
}

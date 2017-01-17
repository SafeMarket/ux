const Amorph = require('../classes/Amorph')

module.exports = function AddressController($scope, $stateParams) {
  $scope.address = new Amorph($stateParams.addressHexPrefixed, 'hex.prefixed')
}

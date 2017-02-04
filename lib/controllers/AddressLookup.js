const Amorph = require('../classes/Amorph')
const contracts = require('safemarket-protocol/modules/contracts')
const solWrappers = require('../solWrappers')
const _ = require('lodash')
const getBlurb = require('../utils/getBlurb')

module.exports = function AddressController($scope, $stateParams, growl, $state) {
  $scope.address = new Amorph($stateParams.addressHexPrefixed, 'hex.prefixed')
  solWrappers.Multiprox.fetch('getCodeHash(address)', [$scope.address]).then((codeHash) => {
    const codeHashBuffer = codeHash.to('buffer')
    const contract = _.find(contracts, (_contract) => {
      return codeHashBuffer.equals(_contract.codeHash.to('buffer'))
    })
    if (contract) {
      $state.go(contract.name, {
        id: $scope.address.to('hex.prefixed')
      })
    }
  })
}

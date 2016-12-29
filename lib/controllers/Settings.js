const currencies = require('../currencies')
const ultralightbeam = require('../ultralightbeam')
const blockFlags = require('ultralightbeam/lib/blockFlags')
const profileManager = require('../profileManager')
const settingsManager = require('../settingsManager')
const Pricemorph = require('pricemorph')

module.exports = function SettingsController(
  $scope,
  $uibModalInstance
) {

  const settings = settingsManager.get()

  $scope.profiles = profileManager.profiles
  $scope.profile = settings.profile
  $scope.currencies = currencies
  $scope.currency = settings.currency

  $scope.$watch('profile', (profile) => {
    $scope.balancePricemorph = null
    ultralightbeam.eth.getBalance(profile.persona.address, blockFlags.latest).then((balance) => {
      $scope.balancePricemorph = new Pricemorph(balance, 'WEI')
    })
  })

  $scope.submit = function submit() {
    settingsManager.set({
      currency: $scope.currency,
      profile: $scope.profile
    })
    $uibModalInstance.close()
  }

  $scope.cancel = function submit() {
    $uibModalInstance.close()
  }
}

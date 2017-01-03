const currencies = require('../currencies')
const ultralightbeam = require('../ultralightbeam')
const blockFlags = require('ultralightbeam/lib/blockFlags')
const settingsManager = require('../settingsManager')
const Pricemorph = require('pricemorph')

module.exports = function SettingsController(
  $scope,
  $uibModalInstance,
  $uibModal
) {

  $scope.currencies = currencies

  function updateScopeWithSettings(settings) {
    $scope.profiles = settings.profiles
    $scope.profile = settings.profile
    $scope.currency = settings.currency
  }

  updateScopeWithSettings(settingsManager.get())

  settingsManager.emitter.on('settings', updateScopeWithSettings)

  $scope.updateBalance = () => {
    $scope.balancePricemorph = null
    ultralightbeam.eth.getBalance($scope.profile.persona.address, blockFlags.latest).then((
      balance
    ) => {
      $scope.balancePricemorph = new Pricemorph(balance, 'WEI')
    })
  }

  $scope.$watch('profile', () => {
    if (!$scope.profile) {
      return
    }
    $scope.updateBalance()
  })

  $scope.$on('transfer', () => {
    $scope.updateBalance()
  })

  $scope.logout = function logout() {
    $uibModal.open({
      templateUrl: 'html/logoutModal.html',
      controller: 'Logout'
    })
  }

  $scope.register = function register() {
    $uibModal.open({
      templateUrl: 'html/registerModal.html',
      controller: 'Register'
    })
  }

  $scope.login = function login() {
    console.log('login')
    $uibModal.open({
      templateUrl: 'html/loginModal.html',
      controller: 'Login'
    })
  }

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

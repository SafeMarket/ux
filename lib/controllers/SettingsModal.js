const currencyOptions = require('../currencyOptions')
const ultralightbeam = require('../ultralightbeam')
const settingsManager = require('../settingsManager')
const Pricemorph = require('../classes/Pricemorph')

module.exports = function SettingsModalController(
  $scope,
  $uibModalInstance,
  $uibModal
) {

  $scope.currencyOptions = currencyOptions

  function updateScopeWithSettings(settings) {
    $scope.profiles = settings.profiles
    $scope.profile = settings.profile
    $scope.currency = settings.currency
    $scope.country = settings.country
  }

  updateScopeWithSettings(settingsManager.get())

  settingsManager.emitter.on('settings', updateScopeWithSettings)

  $scope.updateBalance = () => {
    $scope.balancePricemorph = null
    ultralightbeam.eth.getBalance($scope.profile.persona.address).then((
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
      controller: 'LogoutModal'
    })
  }

  $scope.register = function register() {
    $uibModal.open({
      templateUrl: 'html/registerModal.html',
      controller: 'RegisterModal'
    })
  }

  $scope.login = function login() {
    $uibModal.open({
      templateUrl: 'html/loginModal.html',
      controller: 'LoginModal'
    })
  }

  $scope.submit = function submit() {
    settingsManager.set({
      currency: $scope.currency,
      country: $scope.country,
      profile: $scope.profile
    })
    $uibModalInstance.close()
  }

  $scope.cancel = function submit() {
    $uibModalInstance.close()
  }
}

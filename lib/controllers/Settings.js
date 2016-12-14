const currencies = require('../currencies')
const _ = require('lodash')

module.exports = function SettingsController($scope, profileManager) {

  $scope.profiles = profileManager.getProfiles()
  $scope.profile = $scope.profiles[0]
  $scope.currencies = currencies
  $scope.currency = _.find(currencies, (currency) => {
    return currency.to('ascii').indexOf('USD') === 0
  })

  $scope.$watch('profile', (profile) => {
    $scope.balance = null
    profile.getBalance().then((balance) => {
      $scope.balance = balance
      $scope.$apply()
    })

    $scope.internalRecipients = $scope.profiles.filter((_profile) => {
      return !profile.persona.address.equals(_profile.persona.address, 'hex')
    }).map((_profile) => {
      return _profile.persona.address
    })
    $scope.internalRecipient = $scope.internalRecipients[0]
  })

  $scope.recipientTypes = {
    internal: 'One of my Safemarket profiles',
    external: 'An external address'
  }
  $scope.recipientType = 'internal'

  $scope.amountTypes = {
    everything: 'Transfer everything',
    fixed: 'Transfer a fixed amount'
  }
  $scope.amountType = 'everything'
}

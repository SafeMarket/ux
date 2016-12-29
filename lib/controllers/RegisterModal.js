const _ = require('lodash')
const Profile = require('../classes/Profile')
const createAuthfile = require('../utils/createAuthfile')
const download = require('../utils/download')

module.exports = function RegisterModalController(
  growl,
  $scope,
  profileManager,
  $uibModalInstance,
  $uibModal,
  $rootScope
) {
  $scope.submit = function submit() {

    if (!$scope.passphrase || $scope.passphrase.length === 0) {
      growl.error('A passphrase is required')
      return
    }

    if ($scope.passphrase !== $scope.passphrase1) {
      growl.error('Passphrases do not match')
      return
    }

    const profiles = []
    _.range(10).forEach(() => {
      profiles.push(new Profile())
    })

    const authfile = createAuthfile(profiles, $scope.passphrase)
    const rand = Math.floor(Math.random() * 10000000000000).toString(36)
    const filename = `safemarket-${rand}.txt`
    download(authfile, filename)

    profileManager.setProfiles(profiles)
    growl.success('Registration complete! Make sure your authfile is safe.')
    $rootScope.isLoggedIn = true
    $uibModalInstance.close()

    $uibModal.open({
      templateUrl: 'html/settingsModal.html',
      controller: 'Settings'
    })
  }
}

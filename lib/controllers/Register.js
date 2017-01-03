const _ = require('lodash')
const Profile = require('../classes/Profile')
const createAuthfile = require('../utils/createAuthfile')
const download = require('../utils/download')
const getBlurb = require('../utils/getBlurb')

module.exports = function RegisterModalController(
  growl,
  $scope,
  $uibModalInstance,
  $uibModal
) {

  $scope.submit = function submit() {

    if (!$scope.passphrase || $scope.passphrase.length === 0) {
      growl.error(getBlurb('passphrase_required'))
      return
    }

    if ($scope.passphrase !== $scope.passphraseConfirmation) {
      growl.error(getBlurb('passphrase_mismatch'))
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

    growl.success(getBlurb('registration_successful'))
    $uibModalInstance.close()

    $uibModal.open({
      templateUrl: 'html/loginModal.html',
      controller: 'Login'
    })
  }
}

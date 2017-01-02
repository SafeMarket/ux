const _ = require('lodash')
const Profile = require('../classes/Profile')
const createAuthfile = require('../utils/createAuthfile')
const download = require('../utils/download')
const blurbsPojo = require('../../generated/blurbsPojo.gs')

module.exports = function RegisterModalController(
  growl,
  $scope,
  $uibModalInstance,
  $uibModal
) {

  $scope.submit = function submit() {

    if (!$scope.passphrase || $scope.passphrase.length === 0) {
      growl.error(blurbsPojo.passphrase_required.eng)
      return
    }

    if ($scope.passphrase !== $scope.passphraseConfirmation) {
      growl.error(blurbsPojo.passphrase_mismatch.eng)
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

    growl.success('Registration complete! Make sure your authfile is safe.')
    $uibModalInstance.close()

    $uibModal.open({
      html: 'html/loginModal.html',
      controller: 'Login'
    })
  }
}

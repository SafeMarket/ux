const Profile = require('../classes/Profile')
const createAuthfile = require('../utils/createAuthfile')
const download = require('../utils/download')
const getBlurb = require('../utils/getBlurb')

module.exports = function RegisterModalController(
  toaster,
  $scope,
  $uibModalInstance,
  $uibModal
) {

  $scope.openLoginModal = function openLoginModal() {
    $uibModal.open({
      templateUrl: 'html/loginModal.html',
      controller: 'LoginModal'
    }).result.then(() => {
      $uibModalInstance.close()
    })
  }

  $scope.cancel = function cancel() {
    $uibModalInstance.dismiss()
  }

  $scope.submit = function submit() {

    if (!$scope.passphrase || $scope.passphrase.length === 0) {
      toaster.error(getBlurb('passphrase_required'))
      return
    }

    if ($scope.passphrase !== $scope.passphraseConfirmation) {
      toaster.error(getBlurb('passphrase_mismatch'))
      return
    }

    const authfile = createAuthfile(Profile.generate(), $scope.passphrase)
    const rand = Math.floor(Math.random() * 10000000000000).toString(36)
    const filename = `safemarket-${rand}.txt`
    download(authfile, filename)

    toaster.success(getBlurb('registration_successful'))

    $uibModal.open({
      templateUrl: 'html/loginModal.html',
      controller: 'LoginModal'
    }).result.then(() => {
      $uibModalInstance.close()
    })
  }
}

/* global FileReader */

const parseAuthfile = require('../utils/parseAuthfile')
const getBlurb = require('../utils/getBlurb')
const settings = require('../settingsManager')

module.exports = function LoginModalController(
  growl,
  $scope,
  $uibModalInstance,
  $q
) {

  const fileReader = new FileReader()

  $scope.cancel = function cancel() {
    $uibModalInstance.close()
  }

  $scope.$watch('authfileFile', (authfileFile) => {
    if (!authfileFile) {
      return
    }
    const deferred = $q.defer()
    delete $scope.authfile
    fileReader.onload = () => {
      delete fileReader.onload
      $scope.authfile = fileReader.result
      deferred.resolve()
    }
    fileReader.readAsText(authfileFile)
  })

  $scope.submit = function submit() {

    if (!$scope.authfile) {
      growl.error(getBlurb('authfile_required'))
      return
    }

    if (!$scope.passphrase) {
      growl.error(getBlurb('passphrase_required'))
      return
    }

    let profiles

    try {
      profiles = parseAuthfile($scope.authfile, $scope.passphrase)
    } catch (err) {
      growl.error(getBlurb('could_not_decrypt_authfile'))
      return
    }

    settings.set({
      profiles: profiles,
      profile: profiles[0]
    })

    growl.success(getBlurb('login_successful'))
    $uibModalInstance.close()
  }
}

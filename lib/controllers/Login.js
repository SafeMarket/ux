/* global FileReader */

const parseAuthfile = require('../utils/parseAuthfile')
const getBlurb = require('../utils/getBlurb')
const settings = require('../settingsManager')

module.exports = function LoginController(
  toaster,
  $scope,
  $q,
  $state
) {

  const fileReader = new FileReader()

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
      toaster.pop({ type: 'error', body: getBlurb('authfile_required') })
      return
    }

    if (!$scope.passphrase) {
      toaster.pop({ type: 'error', body: getBlurb('passphrase_error') })
      return
    }

    let profile

    try {
      profile = parseAuthfile($scope.authfile, $scope.passphrase)
    } catch (err) {
      toaster.pop({ type: 'error', body: getBlurb('could_not_decrypt_authfile') })
      return
    }

    settings.set({
      profile: profile
    })

    toaster.pop({ type: 'success', body: getBlurb('login_successful') })
    $state.go('home')
  }
}

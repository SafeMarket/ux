const settingsManager = require('../settingsManager')

module.exports = function MainController($scope, $timeout, $rootScope) {
  settingsManager.emitter.on('update', onSettingsUpdate)
  function onSettingsUpdate() {
    $scope.isLoggedIn = settingsManager.get().profile !== undefined
  }
  onSettingsUpdate()
}

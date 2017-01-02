const settingsManager = require('../settingsManager')

module.exports = function LogoutController($scope, $uibModalInstance) {
  $scope.submit = () => {
    settingsManager.logout()
    $uibModalInstance.close()
  }
  $scope.cancel = () => {
    $uibModalInstance.dismiss()
  }
}

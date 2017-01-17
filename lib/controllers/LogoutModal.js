const settingsManager = require('../settingsManager')

module.exports = function LogoutModalController($scope, $uibModalInstance) {
  $scope.submit = () => {
    settingsManager.logout()
    $uibModalInstance.close()
  }
  $scope.cancel = () => {
    $uibModalInstance.dismiss()
  }
}

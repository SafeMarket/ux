const Q = require('q')
const settingsManager = require('../settingsManager')

module.exports = function loginManager($uibModal) {
  this.requireLogin = function requireLogin() {
    if (settingsManager.get().profile) {
      return Q.resolve()
    }
    return $uibModal.open({
      controller: 'RegisterModal',
      templateUrl: 'html/registerModal.html'
    }).result.then(() => {
      return this.requireLogin()
    })
  }
}

const countries = require('../countries')
const settingsManager = require('../settingsManager')

module.exports = function countrySelectDirective() {
  return {
    templateUrl: 'html/countrySelect.html',
    scope: {
      country: '=countrySelect'
    },
    link: function link($scope) {
      if (!$scope.country) {
        $scope.country = settingsManager.get().country
      }
      $scope.countries = countries
    }
  }
}

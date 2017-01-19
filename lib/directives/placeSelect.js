const places = require('../places')

module.exports = function placeSelectDirective() {
  return {
    templateUrl: 'html/placeSelect.html',
    scope: {
      place: '=placeSelect'
    },
    link: function link($scope) {
      if (!$scope.place) {
        $scope.place = places.dictionary.global
      }
      $scope.places = places
    }
  }
}

const DATA_URL_JPEG = require('../constants/DATA_URL_JPEG')

module.exports = function fileInputDirective() {
  return {
    restrict: 'A',
    scope: {
      image: '=amorphImage'
    },
    link: ($scope, el) => {
      $scope.$watch('image', (image) => {
        if (!image) {
          el.attr('src', '')
        } else {
          el.attr('src', `${DATA_URL_JPEG}${$scope.image.to('base64')}`)
        }
      })
    }
  }
}

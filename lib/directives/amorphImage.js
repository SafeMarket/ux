const DATA_URL_JPEG = require('../constants/DATA_URL_JPEG')
const ipfsAmorphApi = require('../ipfsAmorphApi')

module.exports = function fileInputDirective() {
  return {
    restrict: 'A',
    scope: {
      multihash: '=amorphImage'
    },
    link: ($scope, $el) => {
      $scope.$watch('multihash', (multihash) => {
        if (multihash) {
          ipfsAmorphApi.getFile(multihash).then((image) => {
            $el.css('background-image', `url('${DATA_URL_JPEG}${image.to('base64')}')`)
            $scope.$apply()

            const el = $el[0]
            el.style.display = 'none'
            // eslint-disable-next-line
            el.offsetHeight
            el.style.display = ''
          })
        }
      })
    }
  }
}

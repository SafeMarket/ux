/* globals FileReader */

const ipfsAmorphApi = require('../ipfsAmorphApi')
const getBlurb = require('../utils/getBlurb')
const Amorph = require('../classes/Amorph')
const DATA_URL_JPEG = require('../constants/DATA_URL_JPEG')

module.exports = function countrySelectDirective(toaster) {
  return {
    templateUrl: 'html/ipfsImagesSelect.html',
    scope: {
      images: '=ipfsImagesSelect'
    },
    link: function link($scope) {
      $scope.$watch('file', () => {
        if (!$scope.file) { return }
        const fileReader = new FileReader()
        fileReader.onload = (progressEvent) => {
          if (progressEvent.target.readyState !== 2) { return }
          const imageDataUrl = progressEvent.target.result
          if (imageDataUrl.indexOf(DATA_URL_JPEG) !== 0) {
            toaster.error(getBlurb('image_type_error'))
            return
          }
          const image = new Amorph(imageDataUrl.substr(DATA_URL_JPEG.length), 'base64')
          $scope.images.push(image)
          toaster.info('Adding 1 file to IPFS')
          ipfsAmorphApi.addFile(image).then((multihash) => {
            toaster.success(`Added ${multihash} to IPFS`)
          })

        }
        fileReader.readAsDataURL($scope.file)
      })

      $scope.delete = (index) => {
        $scope.images.splice(index, 1)
      }

      $scope.moveUp = (index) => {
        const imageAbove = $scope.images[index - 1]
        const imageBelow = $scope.images[index]
        $scope.images[index] = imageAbove
        $scope.images[index - 1] = imageBelow
      }

      $scope.moveDown = (index) => {
        const imageAbove = $scope.images[index]
        const imageBelow = $scope.images[index + 1]
        $scope.images[index] = imageBelow
        $scope.images[index + 1] = imageAbove
      }
    }
  }
}

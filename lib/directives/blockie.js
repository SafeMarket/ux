const blockies = require('blockies')

module.exports = function blockieDirective() {
  return {
    scope: {
      address: '=blockie'
    },
    link($scope, $element) {
      $scope.$watch('address', (address) => {
        if (!address) {
          return
        }
        const dataUrl = blockies({
          seed: address.to('hex.prefixed'),
          size: 8,
          scale: 16
        }).toDataURL()
        $element[0].style.backgroundImage = `url(${dataUrl})`
      })
    }
  }
}

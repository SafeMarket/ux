module.exports = function fileInputDirective() {
  return {
    require: 'ngModel',
    restrict: 'A',
    link: ($scope, el, attrs, ngModel) => {
      el.bind('change', (event) => {
        const files = event.target.files
        const file = files[0]

        ngModel.$setViewValue(file)
        $scope.$apply()
      })
    }
  }
}

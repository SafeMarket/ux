module.exports = function fileInput() {
  return {
    require: 'ngModel',
    link: function link($scope, $element, $attr, $ctrl) {
      $element.bind('change', () => {
        $ctrl.$setViewValue($element[0].files[0])
      })
    }
  }
}

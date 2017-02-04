const Amorph = require('../classes/Amorph')

module.exports = function amorphInputDirective() {
  return {
    scope: {
      form: '@amorphInput',
      min: '@?',
      max: '@?'
    },
    require: 'ngModel',
    link: function amorphInputDirectiveLink($scope, $element, $attrs, $ngModelController) {

      $ngModelController.$parsers.push((value) => {
        return new Amorph(value, $scope.form)
      })

      $ngModelController.$formatters.push((value) => {
        if (!value) {
          return ''
        }
        return value.to($scope.form)
      })

      $ngModelController.$validators.min = (modelValue) => {
        if (typeof $scope.min !== 'number') {
          return true
        }
        if (!modelValue) {
          return false
        }
        return modelValue.to('number') >= $scope.min
      }

      $ngModelController.$validators.max = (modelValue) => {
        if (typeof $scope.max !== 'number') {
          return true
        }
        if (!modelValue) {
          return false
        }
        return modelValue.to('number') <= $scope.max
      }

    }
  }
}

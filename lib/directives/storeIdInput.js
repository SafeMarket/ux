const validateStoreIdCharCodes = require('../utils/validateStoreIdCharCodes')
const Amorph = require('../classes/Amorph')

module.exports = function storeIdInputDirective(toaster, $q) {
  return {
    require: 'ngModel',
    scope: {
      requireAvailability: '=?'
    },
    link: function link($scope, $element, $attributes, $ngModelController) {

      $ngModelController.$parsers.push((value) => {
        return new Amorph(value, 'ascii')
      })

      $ngModelController.$formatters.push((value) => {
        if (!value) {
          return ''
        }
        return value.to('ascii')
      })

      $ngModelController.$validators.charCodes = (modelValue) => {
        if (!modelValue) {
          return false
        }
        if (!validateStoreIdCharCodes(modelValue)) {
          toaster.pop({ type: 'error', body: 'Store ids should only consist of lowercase a-z, 0-9, and _' })
          return false
        }
        return true
      }

      $ngModelController.$asyncValidators.availability = (modelValue) => {
        if (!$scope.requireAvailability) {
          return $q.resolve(true)
        }
      }

    }
  }
}

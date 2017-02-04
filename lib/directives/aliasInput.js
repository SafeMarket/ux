const validateAliasCharCodes = require('../utils/validateAliasCharCodes')
const aliasReg = require('../aliasReg')
const Amorph = require('../classes/Amorph')

module.exports = function aliasInputDirective(growl, $q) {
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
        return validateAliasCharCodes(modelValue)
      }

      $ngModelController.$asyncValidators.availability = (modelValue) => {
        if (!$scope.requireAvailability) {
          return $q.resolve(true)
        }
        return aliasReg.getIsAvailable(modelValue).then((isAvailable) => {
          if (!isAvailable) {
            return $q.reject(false)
          }
          return true
        })
      }

    }
  }
}

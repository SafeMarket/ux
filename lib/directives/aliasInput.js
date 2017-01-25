const validateAliasCharCodes = require('../utils/validateAliasCharCodes')
const getBlurb = require('../utils/getBlurb')
const aliasReg = require('../aliasReg')

module.exports = function aliasInputDirective(growl, $q) {
  return {
    require: 'ngModel',
    link: function link($scope, $element, $attributes, $ngModelController) {
      $ngModelController.$validators.charCodes = (modelValue) => {
        return validateAliasCharCodes(modelValue)
      }
      $ngModelController.$asyncValidators.availability = (modelValue) => {
        console.log('validate', modelValue)
        return aliasReg.getIsAvailable(modelValue).then((isAvailable) => {
          console.log('isAvailable', isAvailable)
          if (!isAvailable) {
            return $q.reject(isAvailable)
          }
          return isAvailable
        })
      }
    }
  }
}

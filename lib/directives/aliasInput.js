const validateAliasCharCodes = require('../utils/validateAliasCharCodes')
const getBlurb = require('../utils/getBlurb')
const aliasReg = require('../aliasReg')

module.exports = function aliasInputDirective(growl) {
  return {
    require: 'ngModel',
    link: function link($scope, $element, $attributes, $ngModelController) {
      $ngModelController.$validators.charCodes = (modelValue) => {
        return validateAliasCharCodes(modelValue)
      }
      $ngModelController.$asyncValidators.isAvailable = (modelValue) => {
        return aliasReg.getIsAvailable(modelValue)
      }
    }
  }
}

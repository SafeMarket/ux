const Amorph = require('../classes/Amorph')
const Pricemorph = require('pricemorph')

module.exports = function pricemorphInputDirective() {
  return {
    require: 'ngModel',
    link: ($scope, $elements, $attributes, $ngModelController) => {

      let currencyAscii

      $scope.$watch('currency', (currency) => {
        currencyAscii = currency.to('ascii')
      })

      $ngModelController.$validators.numeric = (modelValue, viewValue) => {
        return !isNaN(viewValue)
      }

      $ngModelController.$parsers.push((viewValue) => {
        if (!viewValue) {
          return null
        }
        const rate = new Amorph(viewValue, 'number.string')
        const pricemorph = new Pricemorph(rate, currencyAscii)
        return pricemorph
      })

      $ngModelController.$formatters.push((pricemorph) => {
        if (!pricemorph) {
          return ''
        }
        return pricemorph.to(currencyAscii).to('number.string')
      })

    }
  }
}

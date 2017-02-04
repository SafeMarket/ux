const Amorph = require('../classes/Amorph')
const Pricemorph = require('../classes/Pricemorph')
const settingsManager = require('../settingsManager')
const MICRO = require('../constants/MICRO')

module.exports = function pricemorphInputDirective() {
  return {
    require: 'ngModel',
    scope: {
      min: '=?',
      max: '=?'
    },
    link: ($scope, $elements, $attributes, $ngModelController) => {

      if (!$scope.currency) {
        $scope.currency = settingsManager.get().currency
      }

      if (typeof $scope.min !== 'number') {
        $scope.min = 0
      }

      $scope.$watch('currency', () => {
        if ($ngModelController.$modelValue) {
          $ngModelController.$modelValue.numerator = $scope.currency.to('ascii')
        }
      })

      $ngModelController.$validators.numeric = (modelValue, viewValue) => {
        return !isNaN(viewValue)
      }

      $ngModelController.$validators.min = (modelValue) => {
        if (!modelValue) {
          return false
        }
        return modelValue.to($scope.currency.to('ascii')).to('number') >= $scope.min
      }

      $ngModelController.$validators.max = (modelValue) => {
        if (typeof $scope.max !== 'number') {
          return true
        }
        if (!modelValue) {
          return false
        }
        return modelValue.to($scope.currency.to('ascii')).to('number') <= $scope.max
      }

      $ngModelController.$parsers.push((viewValue) => {
        if (viewValue === null) {
          return null
        }
        const currencyAscii = $scope.currency.to('ascii')

        let rate = new Amorph(viewValue, 'number')

        if (currencyAscii[0] === '6') {
          rate = rate.as('bignumber', (bignumber) => {
            return bignumber.div(MICRO)
          })
        }

        return new Pricemorph(rate, $scope.currency.to('ascii'))
      })

      $ngModelController.$formatters.push((pricemorph) => {
        if (!pricemorph) {
          return ''
        }
        if (pricemorph.numerator[0] === '6') {
          return pricemorph.to($scope.currency.to('ascii')).to('bignumber').times(MICRO).toNumber()
        }
        return pricemorph.to($scope.currency.to('ascii')).to('number')
      })

    }
  }
}

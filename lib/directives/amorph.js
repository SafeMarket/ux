const Amorph = require('../Amorph')

module.exports = function amorphDirective() {
  return {
    scope: { form: '@amorph' },
    require: 'ngModel',
    link: function amorphDirectiveController(scope, element, attrs, ngModel) {
      ngModel.$parsers.push((value) => {
        return new Amorph(value, scope.form)
      })

      ngModel.$formatters.push((value) => {
        if (!value) {
          return ''
        }
        return value.to(scope.form)
      })
    }
  }
}

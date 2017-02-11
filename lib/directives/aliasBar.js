module.exports = function aliasBarDirective($state) {
  return {
    templateUrl: 'html/aliasBar.html',
    scope: { alias: '=aliasBar' },
    link: ($scope) => {
      $scope.submit = function submit() {
        $state.go('go', { slug: `@${$scope.alias.to('ascii')}` })
      }
    }
  }
}

module.exports = function timestamp() {
  return {
    scope: { timestamp: '=' },
    templateUrl: 'html/timestamp.html',
    link: ($scope) => {
      $scope.timestampMs = 0
      $scope.$watch('timestamp', () => {
        if (!$scope.timestamp) {
          return
        }
        $scope.timestampMs = $scope.timestamp.to('number') * 1000
      })
    }
  }
}

const _ = require('lodash')
const Order = require('../classes/Order')
const Q = require('q')

module.exports = function ordersDirective() {
  return {
    scope: {
      orderReg: '=',
      ordersBy: '='
    },
    templateUrl: 'html/orders.html',
    link: function ordersLink($scope) {
      $scope.orders = []
      $scope.orderReg.fetch('ordersByStoreCount(address)', [$scope.ordersBy.store]).then((count) => {
        $scope.count = count
        fetchOrders($scope.orderReg, 'ordersByStore(address,uint256)', $scope.ordersBy.store, count).then((orders) => {
          $scope.orders.push(...orders)
        })
      })
    }
  }
}

function fetchOrders(orderReg, method, x, startCount) {
  const fetches = _.range(10).map((i) => {
    const orderByXIndex = startCount.as('number', (number) => {
      return number - i - 1
    })
    if (orderByXIndex.to('number') < 0) {
      return null
    }
    return orderReg.fetch(method, [x, orderByXIndex]).then((orderId) => {
      console.log('orderId', orderId)
      return new Order(orderReg, orderId)
    })
  }).filter((orderId) => {
    return orderId !== null
  })
  return Q.all(fetches)
}

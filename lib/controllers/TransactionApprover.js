const gasPricemorphPoller = require('../gasPricemorphPoller')
const currencies = require('../currencies')
const Pricemorph = require('pricemorph')
const Amorph = require('amorph')

module.exports = function TransactionApprover(
  $scope,
  title,
  from,
  to,
  valuePricemorph,
  gasPromiseWrapper,
  transactionRequestPromiseWrapper,
  balancePricemorphPromiseWrapper,
  $uibModalInstance
) {

  $scope.title = title
  $scope.from = from
  $scope.to = to
  $scope.gasPricemorph = gasPricemorphPoller.gasPricemorph
  $scope.valuePricemorph = valuePricemorph
  $scope.WEI = currencies.WEI

  gasPricemorphPoller.emitter.on('gasPricemorph', (gasPricemorph) => {
    $scope.gasPricemorph = gasPricemorph
  })

  gasPromiseWrapper().then((gas) => {
    $scope.gas = gas
  })

  balancePricemorphPromiseWrapper().then((balancePricemorph) => {
    $scope.balancePricemorph = balancePricemorph
  })

  let transactionRequest

  transactionRequestPromiseWrapper().then((_transactionRequest) => {
    transactionRequest = _transactionRequest
  })

  $scope.$watchGroup(['gasPricemorph', 'gas'], () => {
    if (!$scope.gas || !$scope.gasPricemorph) {
      return
    }
    const gasPriceWeiBignumber = $scope.gasPricemorph.to('WEI').to('bignumber')
    const gasBignumber = $scope.gas.to('bignumber')
    const gasCostWEIBignumber = gasPriceWeiBignumber.times(gasBignumber)
    const gasCostWEI = new Amorph(gasCostWEIBignumber, 'bignumber')
    $scope.gasCostPricemorph = new Pricemorph(gasCostWEI, 'WEI')

    const valueWEIBignumber = $scope.valuePricemorph.to('WEI').to('bignumber')
    const totalCostBignumber = gasCostWEIBignumber.plus(valueWEIBignumber)
    const totalCost = new Amorph(totalCostBignumber, 'bignumber')
    $scope.totalCostPricemorph = new Pricemorph(totalCost, 'WEI')
  })

  $scope.$watchGroup(['balancePricemorph', 'totalCostPricemorph'], () => {
    if (!$scope.balancePricemorph || !$scope.totalCostPricemorph) {
      return
    }
    const balanceWEIBignumber = $scope.balancePricemorph.to('WEI').to('bignumber')
    const totalCostWEIBignumber = $scope.totalCostPricemorph.to('WEI').to('bignumber')
    if (totalCostWEIBignumber.gt(balanceWEIBignumber)) {
      $scope.isTotalCostGreaterThanBalance = true
    } else {
      $scope.isTotalCostGreaterThanBalance = false
    }
  })

  $scope.$watchGroup(['isTotalCostGreaterThanBalance'], () => {
    if ($scope.isTotalCostGreaterThanBalance !== false) {
      $scope.isApprovable = false
    } else {
      $scope.isApprovable = true
    }
  })

  $scope.submit = () => {
    $uibModalInstance.close(transactionRequest)
  }

  $scope.cancel = () => {
    $uibModalInstance.dismiss()
  }
}

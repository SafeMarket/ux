const gasPricemorphPoller = require('../gasPricemorphPoller')
const currencies = require('../currencies')
const Pricemorph = require('pricemorph')
const Amorph = require('amorph')

module.exports = function TransactionApprover(
  $scope,
  title,
  gasMultiplier,
  from,
  to,
  data,
  valuePricemorph,
  gasPromiseWrapper,
  transactionRequestPromiseWrapper,
  balancePricemorphPromiseWrapper,
  $uibModalInstance,
  $q
) {

  console.log('passed in Gas Multiplier', gasMultiplier)

  $scope.isReady = false
  $scope.title = title
  $scope.gasMultiplier = gasMultiplier
  $scope.from = from
  $scope.to = to
  $scope.data = data
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
    console.log('balancePricemorph', balancePricemorph)
    $scope.balancePricemorph = balancePricemorph
  }, (err) => {
    console.log(err)
  })

  $q.all([
    gasPromiseWrapper(),
    balancePricemorphPromiseWrapper()
  ]).then(() => {
    $scope.isReady = true
  })

  let transactionRequest

  transactionRequestPromiseWrapper().then((_transactionRequest) => {
    transactionRequest = _transactionRequest
  })

  $scope.$watchGroup(['gasPricemorph', 'gas', 'gasMultiplier'], () => {
    console.log('gasMultiplier', $scope.gasMultiplier)
    if (!$scope.gas || !$scope.gasPricemorph) {
      return
    }
    console.log($scope)
    const gasPriceWeiBignumber = $scope.gasPricemorph.to('WEI').to('bignumber')
    const gasBignumber = $scope.gas.to('bignumber').times($scope.gasMultiplier)
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
    const gasBignumber = $scope.gas.to('bignumber').times($scope.gasMultiplier)
    const gas = new Amorph(gasBignumber, 'bignumber')
    transactionRequest.set('gas', gas)
    transactionRequest.set('gasPrice', $scope.gasPricemorph.to('WEI'))
    $uibModalInstance.close(transactionRequest)
  }

  $scope.cancel = () => {
    $uibModalInstance.dismiss()
  }
}
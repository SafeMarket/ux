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
  $uibModalInstance
) {

  console.log('transactionApprover')

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

  $scope.submit = () => {
    $uibModalInstance.close(transactionRequest)
  }

  $scope.cancel = () => {
    $uibModalInstance.dismiss()
  }
}

const Amorph = require('../classes/Amorph')
const Bignumber = require('bignumber.js')
const Pricemorph = require('../classes/Pricemorph')
const settingsManager = require('../settingsManager')
const ZERO = require('../constants/ZERO')
const MICRO = require('../constants/MICRO')
const pricemorphPoller = require('../pricemorphsPoller')
const getArbitratorOptions = require('../utils/getArbitratorOptions')
const solWrappers = require('../solWrappers')
const getAffiliate = require('../utils/getAffiliate')

module.exports = function StoreProductsController($scope, transactionManager) {

  getArbitratorOptions($scope.store).then((arbitratorOptions) => {
    $scope.arbitratorOptions = arbitratorOptions
    $scope.arbitratorOption = arbitratorOptions[0]
  })

  const currencyAscii = settingsManager.get().currency.to('ascii')

  $scope.transport = $scope.store.transports.filter((transport) => {
    return transport.isArchived.to('boolean') === false
  })[0]

  $scope.productQuantities = $scope.store.products.map(() => {
    return ZERO
  })

  $scope.productsTotal = new Pricemorph(ZERO, currencyAscii)

  function setProductsTotal() {
    let productsTotalBignumber = new Bignumber(0)
    $scope.store.products.forEach((product, index) => {
      const quantityBignumber = $scope.productQuantities[index].to('bignumber')
      const productTotalBignumber = product.price.to(currencyAscii).to('bignumber').times(quantityBignumber)
      productsTotalBignumber = productsTotalBignumber.plus(productTotalBignumber)
    })
    $scope.productsTotal = new Pricemorph(new Amorph(productsTotalBignumber, 'bignumber'), currencyAscii)
  }

  $scope.onQuantitiesChanged = function onQuantitiesChanged() {
    setProductsTotal()
  }

  function setTotals() {
    const productsTotalBignumber = $scope.productsTotal.to(currencyAscii).to('bignumber')
    const transportPriceBignumber = $scope.transport.price.to(currencyAscii).to('bignumber')
    const bufferPerunBignumber = $scope.store.bufferMicroperun.to('bignumber').times(MICRO)
    // eslint-disable-next-line max-len
    const bufferBignumber = productsTotalBignumber.plus(transportPriceBignumber).times(bufferPerunBignumber)

    let arbitratorTotalBignumber = new Bignumber(0)
    if ($scope.arbitratorOption) {
      const arbitrator = $scope.arbitratorOption.arbitrator
      if (arbitrator) {
        arbitratorTotalBignumber = arbitrator.feeBase.to(currencyAscii).to('bignumber').plus(
          productsTotalBignumber.times(arbitrator.feeMicroperun.to('bignumber')).times(MICRO)
        )
      }
    }
    const totalBignumber = productsTotalBignumber.plus(transportPriceBignumber).plus(bufferBignumber).plus(arbitratorTotalBignumber)

    $scope.buffer = new Pricemorph(new Amorph(bufferBignumber, 'bignumber'), currencyAscii)
    $scope.arbitratorTotal = new Pricemorph(new Amorph(arbitratorTotalBignumber, 'bignumber'), currencyAscii)
    $scope.total = new Pricemorph(new Amorph(totalBignumber, 'bignumber'), currencyAscii)
  }


  $scope.$watchGroup(['productsTotal', 'transport', 'arbitratorOption'], () => {
    if (pricemorphPoller.isReady) {
      setTotals()
    } else {
      pricemorphPoller.promise.then(() => {
        setTotals()
      })
    }
  })
  $scope.onQuantitiesChanged()

  $scope.createOrder = function createOrder() {

    const productIds = []
    const productQuantities = []

    $scope.productQuantities.forEach((quantity, index) => {
      if (quantity.to('number') === 0) {
        return
      }
      productIds.push(new Amorph(index, 'number'))
      productQuantities.push(quantity)
    })

    const inputs = [
      this.store.address,
      this.arbitratorOption.address,
      getAffiliate(),
      productIds,
      productQuantities,
      this.transport.id
    ]

    const transactionRequest = solWrappers.OrderReg.getTransactionRequest(
      'create(address,address,address,uint256[],uint256[],uint256)', inputs, {
        value: $scope.total.to('WEI')
      }
    )
    transactionManager.request('Create a New Order', transactionRequest)
  }
}

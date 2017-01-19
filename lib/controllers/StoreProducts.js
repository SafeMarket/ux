const Amorph = require('../classes/Amorph')
const Bignumber = require('bignumber.js')
const Pricemorph = require('../classes/Pricemorph')
const settingsManager = require('../settingsManager')
const ZERO = require('../constants/ZERO')
const CENTI = require('../constants/CENTI')
const pricemorphPoller = require('../pricemorphsPoller')


module.exports = function StoreProductsController($scope) {

  const currencyAscii = settingsManager.get().currency.to('ascii')


  $scope.transport = $scope.store.transports.filter((transport) => {
    return transport.isArchived.to('boolean') === false
  })[0]

  $scope.productUnits = $scope.store.products.map(() => {
    return ZERO
  })

  $scope.productsTotal = new Pricemorph(ZERO, currencyAscii)

  function setProductsTotal() {
    let productsTotalBignumber = new Bignumber(0)
    $scope.store.products.forEach((product, index) => {
      const unitsBignumber = $scope.productUnits[index].to('bignumber')
      const productTotalBignumber = product.price.to(currencyAscii).to('bignumber').times(unitsBignumber)
      productsTotalBignumber = productsTotalBignumber.plus(productTotalBignumber)
    })
    $scope.productsTotal = new Pricemorph(new Amorph(productsTotalBignumber, 'bignumber'), currencyAscii)
  }

  $scope.onQuantitiesChanged = function onQuantitiesChanged() {
    setProductsTotal()
  }

  function setBufferAndTotal() {
    const productsTotalBignumber = $scope.productsTotal.to(currencyAscii).to('bignumber')
    const transportPriceBignumber = $scope.transport.price.to(currencyAscii).to('bignumber')
    const bufferPerunBignumber = $scope.store.bufferCentiperun.to('bignumber').times(CENTI)
    const bufferBignumber = productsTotalBignumber.plus(transportPriceBignumber).times(bufferPerunBignumber)
    const totalBignumber = productsTotalBignumber.plus(transportPriceBignumber).plus(bufferBignumber)

    $scope.buffer = new Pricemorph(new Amorph(bufferBignumber, 'bignumber'), currencyAscii)
    $scope.total = new Pricemorph(new Amorph(totalBignumber, 'bignumber'), currencyAscii)
  }

  $scope.$watchGroup(['productsTotal', 'transport'], () => {
    if (pricemorphPoller.isReady) {
      setBufferAndTotal()
    } else {
      pricemorphPoller.promise.then(() => {
        setBufferAndTotal()
      })
    }
  })


  $scope.onQuantitiesChanged()
}

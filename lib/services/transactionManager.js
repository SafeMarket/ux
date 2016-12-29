const ultralightbeam = require('../ultralightbeam')
const settingsManager = require('../settingsManager')
const Pricemorph = require('pricemorph')

module.exports = function transactionManagerService($uibModal, $q) {
  this.request = function request(title, _transactionRequest) {

    const deferredApprover = $q.defer()
    const deferredGas = $q.defer()
    const deferredTransactionRequest = $q.defer()
    const from = settingsManager.get().profile.persona
    const gasPrice = ultralightbeam.blockPoller.gasPrice
    const valuePricemorph = new Pricemorph(_transactionRequest.values.value, 'WEI')

    ultralightbeam.sendTransaction(_transactionRequest, (transactionRequest, gas) => {

      console.log('approver', transactionRequest, gas)

      transactionRequest.set('from', from)
      transactionRequest.set('gas', gas)
      transactionRequest.set('gasPrice', gasPrice)

      deferredGas.resolve(gas)
      deferredTransactionRequest.resolve(transactionRequest)

      return deferredApprover.promise

    })

    return $uibModal.open({
      templateUrl: 'html/transactionApprover.html',
      controller: 'TransactionApprover',
      resolve: {
        title: () => {
          return title
        },
        from: () => {
          return from
        },
        to: () => {
          return _transactionRequest.values.to
        },
        valuePricemorph: () => {
          return valuePricemorph
        },
        gasPromiseWrapper: () => {
          return () => {
            return deferredGas.promise
          }
        },
        transactionRequestPromiseWrapper: () => {
          return () => {
            return deferredTransactionRequest.promise
          }
        }
      }
    })

  }
}

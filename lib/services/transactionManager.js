const ultralightbeam = require('../ultralightbeam')
const settingsManager = require('../settingsManager')
const Pricemorph = require('pricemorph')
const blockFlags = require('ultralightbeam/lib/blockFlags')

module.exports = function transactionManagerService($uibModal, $q) {
  this.request = function request(title, _transactionRequest) {

    const deferredTransactionApprover = ultralightbeam.defer()
    const deferredGas = $q.defer()
    const deferredTransactionRequest = $q.defer()
    const from = _transactionRequest.values.from || settingsManager.get().profile.persona
    const to = _transactionRequest.values.to
    const gasPrice = ultralightbeam.blockPoller.gasPrice
    const valuePricemorph = new Pricemorph(_transactionRequest.values.value, 'WEI')

    const transactionMonitor = ultralightbeam.sendTransaction(
      _transactionRequest,
      (transactionRequest, gas) => {

        transactionRequest.set('from', from)
        transactionRequest.set('gas', gas)
        transactionRequest.set('gasPrice', gasPrice)

        deferredGas.resolve(gas)
        deferredTransactionRequest.resolve(transactionRequest)

        return ultralightbeam.eth.getTransactionCount(from.address, blockFlags.latest).then((
          transactionCount
        ) => {
          transactionRequest.set('nonce', transactionCount)
          return transactionRequest
        })

      }
    )

    return $uibModal.open({
      templateUrl: 'html/transactionApproverModal.html',
      controller: 'TransactionApprover',
      resolve: {
        title: () => {
          return title
        },
        from: () => {
          return from
        },
        to: () => {
          return to
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
    }).result.then((transactionRequest) => {
      deferredTransactionApprover.resolve(transactionRequest)
      return $uibModal.open({
        templateUrl: 'html/transactionMonitorModal.html',
        controller: 'TransactionMonitor',
        resolve: {
          title: () => {
            return title
          },
          transactionHashPromiseWrapper: () => {
            return () => {
              return transactionMonitor.transactionHashPromise
            }
          },
          transactionPromiseWrapper: () => {
            return () => {
              return transactionMonitor.transactionPromise
            }
          },
          transactionReceiptPromiseWrapper: () => {
            return () => {
              return transactionMonitor.getTransactionReceipt()
            }
          }
        }
      }).result
    })

  }
}

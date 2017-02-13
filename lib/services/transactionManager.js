const ultralightbeam = require('../ultralightbeam')
const settingsManager = require('../settingsManager')
const Pricemorph = require('../classes/Pricemorph')
const ZERO = require('../constants/ZERO')
const Q = require('q')

module.exports = function transactionManagerService($uibModal, $q, loginManager) {
  this.request = function request(title, _transactionRequest, _gasMultiplier) {
    console.log('loginManager', loginManager)
    return loginManager.requireLogin().then(() => {

      const deferredTransactionApprover = ultralightbeam.defer()
      const deferredGas = $q.defer()
      const deferredTransactionRequest = $q.defer()

      const gasMultiplier = _gasMultiplier || 1
      const from = _transactionRequest.values.from || settingsManager.get().profile.persona
      const to = _transactionRequest.values.to
      const data = _transactionRequest.values.data
      const gasPrice = ultralightbeam.blockPoller.gasPrice
      const valuePricemorph = _transactionRequest.values.value ?
        new Pricemorph(_transactionRequest.values.value, 'WEI')
        : new Pricemorph(ZERO, 'WEI')

      const deferredBalancePromise = ultralightbeam.eth.getBalance(from.address).then((balanceWEI) => {
        return new Pricemorph(balanceWEI, 'WEI')
      })

      const transactionMonitor = ultralightbeam.sendTransaction(
        _transactionRequest,
        (transactionRequest) => {
          transactionRequest.set('from', from)
          transactionRequest.set('gasPrice', gasPrice)
          deferredTransactionRequest.resolve(transactionRequest)
          const noncePromise = ultralightbeam.eth.getTransactionCount(from.address).then((nonce) => {
            transactionRequest.set('nonce', nonce)
          })
          const gasPromise = ultralightbeam.eth.estimateGas(transactionRequest).then((gas) => {
            deferredGas.resolve(gas)
          })
          return Q.all([noncePromise, gasPromise]).then(() => {
            return deferredTransactionApprover.promise
          })
        }
      )

      return $uibModal.open({
        templateUrl: 'html/transactionApproverModal.html',
        controller: 'TransactionApproverModal',
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
          gasMultiplier: () => {
            return gasMultiplier
          },
          data: () => {
            return data
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
          },
          balancePricemorphPromiseWrapper: () => {
            return () => {
              return deferredBalancePromise
            }
          }
        }
      }).result.then((transactionRequest) => {
        deferredTransactionApprover.resolve(transactionRequest)
        return $uibModal.open({
          templateUrl: 'html/transactionMonitorModal.html',
          controller: 'TransactionMonitorModal',
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
        }).result.then(() => {
          return transactionMonitor.getTransactionReceipt()
        })
      })
    })
  }
}

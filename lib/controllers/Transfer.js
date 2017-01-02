const Amorph = require('../classes/Amorph')
const Pricemorph = require('../classes/Pricemorph')
const TransactionRequest = require('ultralightbeam/lib/TransactionRequest')
const blockFlags = require('ultralightbeam/lib/blockFlags')
const ultralightbeam = require('../ultralightbeam')
const settingsManager = require('../settingsManager')

module.exports = function TransferController($scope, $q, transactionManager, growl) {

  const settings = settingsManager.get()

  $scope.$watch('profile', (profile) => {
    $scope.recipientsInternal = settings.profiles.filter((_profile) => {
      return !profile.persona.address.equals(_profile.persona.address, 'hex')
    }).map((_profile) => {
      return _profile.persona.address
    })
    $scope.recipientInternal = $scope.recipientsInternal[0]
  })

  $scope.recipientTypes = {
    internal: 'One of my Safemarket profiles',
    external: 'An external address'
  }
  $scope.recipientType = 'internal'

  $scope.$watchGroup(['recipientType', 'recipientInternal', 'recipientExternal'], () => {
    $scope.recipient = getRecipient()
  })

  $scope.amountTypes = {
    everything: 'Transfer everything',
    fixed: 'Transfer a fixed amount'
  }
  $scope.amountType = 'everything'

  function getRecipient() {
    if ($scope.recipientType === 'internal') {
      return $scope.recipientInternal
    }
    if ($scope.recipientType === 'external') {
      return $scope.recipientExternal
    }
  }

  function getAmountWEI() {

    if (!Pricemorph.isReady) {
      return $q.reject(new Error('Exchange rate data not ready'))
    }

    if ($scope.amountType === 'fixed') {
      const amountWEIBignumber = $scope.amount.to('WEI').to('bignumber').round()
      const amountWEI = new Amorph(amountWEIBignumber, 'bignumber')
      return $q.resolve(amountWEI)
    }
    const recipient = $scope.recipientInternal
    return ultralightbeam.eth.getBalance($scope.profile.persona.address, blockFlags.latest).then((
      balanceWEI
    ) => {
      const transactionRequest = new TransactionRequest({
        to: recipient,
        value: balanceWEI
      })
      return ultralightbeam.eth.estimateGas(transactionRequest, blockFlags.latest).then((gas) => {
        const amountWEIBignumber =
          balanceWEI.to('bignumber')
          .minus(gas.to('bignumber').times(ultralightbeam.blockPoller.gasPrice.to('bignumber')))
        return new Amorph(amountWEIBignumber, 'bignumber')
      })
    })
  }

  $scope.transfer = function transfer() {
    const recipient = getRecipient()
    const from = $scope.profile.persona

    return getAmountWEI().then((amountWEI) => {

      if (amountWEI.to('bignumber').lte(0)) {
        return $q.reject(new Error('Amount too small to transfer'))
      }

      $scope.amount = new Pricemorph(new Amorph(0, 'number'), 'WEI')
      const title = 'Transfer Ether'
      const transactionRequest = new TransactionRequest({
        to: recipient,
        from: from,
        value: amountWEI
      })
      return transactionManager.request(title, transactionRequest).then(() => {
        $scope.$emit('transfer')
      })
    }).catch((err) => {
      growl.error(err.message)
    })
  }
}

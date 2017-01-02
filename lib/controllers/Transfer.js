const Amorph = require('../classes/Amorph')
const Pricemorph = require('../classes/Pricemorph')
const TransactionRequest = require('ultralightbeam/lib/TransactionRequest')
const blockFlags = require('ultralightbeam/lib/blockFlags')
const ultralightbeam = require('../ultralightbeam')
const profileManager = require('../profileManager')

module.exports = function TransferController($scope, $q, transactionManager) {

  $scope.$watch('profile', (profile) => {
    $scope.recipientsInternal = profileManager.profiles.filter((_profile) => {
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

  function getAmountWei() {
    if ($scope.amountType === 'fixed') {
      return $q.resolve($scope.amount.to('WEI'))
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
        const amountWeiBignumber =
          balanceWEI.to('bignumber')
          .minus(gas.to('bignumber').times(ultralightbeam.blockPoller.gasPrice.to('bignumber')))
        return new Amorph(amountWeiBignumber, 'bignumber')
      })
    })
  }

  $scope.transfer = function transfer() {
    const recipient = getRecipient()
    const from = $scope.profile.persona
    console.log('from', from.address.to('hex'))
    return getAmountWei().then((amountWei) => {
      $scope.amount = new Pricemorph(new Amorph(0, 'number'), 'WEI')
      const title = 'Transfer Ether'
      const transactionRequest = new TransactionRequest({
        to: recipient,
        from: from,
        value: amountWei
      })
      return transactionManager.request(title, transactionRequest).then(() => {
        console.log('transfer')
        $scope.$emit('transfer')
      })
    })
  }
}

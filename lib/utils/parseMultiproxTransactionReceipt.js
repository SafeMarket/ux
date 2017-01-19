const Amorph = require('../classes/Amorph')

module.exports = function parseMultiproxTransactionReceipt(transactionReceipt) {
  const senderArray = transactionReceipt.logs[0].topics[1].to('array').slice(-20)
  const contractAddressArray = transactionReceipt.logs[0].data.to('array').slice(-20)
  return {
    sender: new Amorph(senderArray, 'array'),
    codeHash: transactionReceipt.logs[0].topics[2],
    contractAddress: new Amorph(contractAddressArray, 'array')
  }
}

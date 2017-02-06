const Amorph = require('../classes/Amorph')
const Q = require('q')
const SolWrapper = require('ultralightbeam/lib/SolWrapper')
const ultralightbeam = require('../ultralightbeam')
const contracts = require('safemarket-protocol/modules/contracts')

module.exports = function getAddressForAlias(address) {
  const types = {}
  const solWrapper = new SolWrapper(ultralightbeam, contracts.Proxy.abi, address)
  const isStoreFetch = solWrapper.fetch('get_bool(bytes32)', [
    new Amorph('isStore', 'ascii')
  ]).then((isStore) => {
    types.store = isStore.to('boolean')
  })
  const isArbitratorFetch = solWrapper.fetch('get_bool(bytes32)', [
    new Amorph('isArbitrator', 'ascii')
  ]).then((isArbitrator) => {
    types.arbitrator = isArbitrator.to('boolean')
  })
  return Q.all([isStoreFetch, isArbitratorFetch]).then(() => {
    console.log(types)
    return types
  })
}

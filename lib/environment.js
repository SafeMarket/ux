const _devContractAddressesHex = require('../generated/contractAddressesHex/dev.gs')
const Amorph = require('./classes/Amorph')
const _ = require('lodash')
const parseAuthfile = require('../lib/utils/parseAuthfile')
const authfile = require('../generated/authfile.gs')

const environment = {
  isDev: true,
  contractAddresses: {},
  isBrowser: typeof window !== 'undefined',
  isNode: typeof window === 'undefined',
  profiles: parseAuthfile(authfile, 'password')
}

_.forEach(_devContractAddressesHex, (contractAddressHex, contractName) => {
  environment.contractAddresses[contractName] = new Amorph(contractAddressHex, 'hex')
})

module.exports = environment

const _devContractAddressesHex = require('../generated/contractAddressesHex/dev.gs')
const Amorph = require('./classes/Amorph')
const _ = require('lodash')
const parseAuthfile = require('../lib/utils/parseAuthfile')
const authfileBase2048English = require('../generated/authfile.gs')

const authfile = new Amorph(authfileBase2048English, 'base2048.english')
const profile = parseAuthfile(authfile, new Amorph('password', 'ascii'))

const environment = {
  isDev: true,
  contractAddresses: {},
  isBrowser: typeof window !== 'undefined',
  isNode: typeof window === 'undefined',
  profile: profile,
  ipfs: {
    host: 'ipfs.infura.io',
    port: '5001',
    protocol: 'https'
  },
  priceSetter: profile.account.address
}

_.forEach(_devContractAddressesHex, (contractAddressHex, contractName) => {
  environment.contractAddresses[contractName] = new Amorph(contractAddressHex, 'hex')
})

module.exports = environment

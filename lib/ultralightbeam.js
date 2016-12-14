const Ultralightbeam = require('ultralightbeam')
const HttpProvider = require('web3/lib/web3/httpprovider')

const ultralightbeam = new Ultralightbeam(new HttpProvider('http://localhost:8545'))

module.exports = ultralightbeam

/* eslint-disable no-console */
require('colors')
const httpServer = require('./httpServer')

httpServer.listen(8080)

console.log('HTTP Server lisetning on :8080'.green)

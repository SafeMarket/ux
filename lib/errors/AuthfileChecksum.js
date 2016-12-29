const createTestableErrorClass = require('testable-error')

module.exports = createTestableErrorClass(
  'AuthfileChecksumError',
  'Authfile checksum did not match'
)

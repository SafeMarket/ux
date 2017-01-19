const createTestableErrorClass = require('testable-error')

module.exports = createTestableErrorClass(
  'NoUpdatesError',
  'Nothing to update'
)

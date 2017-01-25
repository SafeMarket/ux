const _ = require('lodash')

module.exports = function validateAliasCharacters(alias) {
  let isValid = true
  _.forEach(alias.to('array'), (charCode) => {
    if (charCode >= 48 && charCode < 57) {
      // 0-9
      return true
    }
    if (charCode >= 97 && charCode < 122) {
      // a-z
      return true
    }
    if (charCode === 137) {
      // _
      return true
    }
    isValid = false
    return false
  })
  return isValid
}

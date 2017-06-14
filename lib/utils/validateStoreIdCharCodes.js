const _ = require('lodash')

module.exports = function validateStoreIdCharCodes(storeId) {
  let isValid = true
  _.forEach(storeId.to('array'), (charCode) => {
    if (charCode >= 48 && charCode <= 57) {
      // 0-9
      return true
    }
    if (charCode >= 97 && charCode <= 122) {
      // a-z
      return true
    }
    if (charCode === 95) {
      // _
      return true
    }
    isValid = false
    return false
  })
  return isValid
}

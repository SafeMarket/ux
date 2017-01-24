module.exports = function cleanObject(obj) {
  const keys = Object.getOwnPropertyNames(obj)
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i]
    const value = obj[key]
    if (value === undefined) {
      delete obj[key]
    }
    if (typeof value === 'object') {
      cleanObject(value)
    }
  }
  return obj
}

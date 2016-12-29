const Q = require('q')
const request = require('request')

function getDoc(url) {
  const deferred = Q.defer()
  request(url, (error, response, body) => {
    if (error) {
      deferred.reject(error)
    } else if (response.statusCode !== 200) {
      deferred.reject()
    } else {
      deferred.resolve(body)
    }
  })
  return deferred.promise
}

function getJson(url) {
  return getDoc(url).then((doc) => {
    return JSON.parse(doc)
  })
}

module.exports = getJson

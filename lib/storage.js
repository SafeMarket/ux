const Nobject = require('nobject')

const nobject = new Nobject()
const data = localStorage.get('data')
if (data.length > 0) {
  nobject.load(data)
}

const storage = {
  set: function set(...inputs) {
    nobject.set(...inputs)
    localStorage.set('data', nobject.toJSON())
  },
  get: function get(...inputs) {
    nobject.get(...inputs)
  }
}

module.exports = storage

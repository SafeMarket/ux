const _ = require('lodash')
const countries = require('./countries')

const placesDictionary = {
  global: { code: 'global', name: 'Global' }
}

_.merge(placesDictionary, countries.dictionary)

const placesArray = _.values(placesDictionary).concat(countries.array)

module.exports = {
  array: placesArray,
  dictionary: placesDictionary
}

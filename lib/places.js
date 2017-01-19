const _ = require('lodash')
const countries = require('./countries')
const Place = require('./classes/Place')

const placesDictionary = {
  global: new Place('global', 'Global', '🌎')
}

_.merge(placesDictionary, countries.dictionary)

const placesArray = _.values(placesDictionary).concat(countries.array)

placesArray.forEach((place) => {
  place.label = `${place.name} ${place.emoji} `
})

module.exports = {
  array: placesArray,
  dictionary: placesDictionary
}

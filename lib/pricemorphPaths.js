const Nobject = require('nobject')
const pricemorphPathsPojo = require('../generated/pricemorphPathsPojo.gs')
const _ = require('lodash')

const paths = new Nobject()
_.forEach(pricemorphPathsPojo, (_pricemorphPaths, from) => {
  _.forEach(_pricemorphPaths, (path, to) => {
    paths.set(from, to, path)
  })
})

module.exports = paths

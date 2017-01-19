const Q = require('q')
const Amorph = require('../classes/Amorph')
const _ = require('lodash')

function Statesync(schema, fetch) {
  this.schema = schema
  this.fetch = fetch

  this.chainState = {
    variables: {},
    structArrays: {}
  }

  schema.variables.forEach((variable) => {
    this.chainState.variables[variable.name] = null
  })
  schema.structArrays.forEach((structArray) => {
    this.chainState.structArrays[structArray.name] = []
  })
}

module.exports = Statesync

function Update(methodAbi, args) {
  this.methodAbi = methodAbi
  this.args = args
}

Statesync.prototype.getUpdates = function getUpdates(localState) {
  const variableUpdates = this.getVariableUpdates(localState.variables)
  const structUpdates = this.getStructArrayUpdates(localState.structArrays)
  return variableUpdates.concat(structUpdates)
}

Statesync.prototype.getVariableUpdates = function getVariableUpdates(localVariablesState) {
  const updates = []
  this.schema.variables.forEach((variable) => {
    const localStateValue = localVariablesState[variable.name]
    const chainStateValue = this.chainState.variables[variable.name]
    if (!chainStateValue || !chainStateValue.equals(localStateValue)) {
      updates.push(
        new Update(variable.setMethodAbi, [localStateValue])
      )
    }
  })
  return updates
}

Statesync.prototype.getStructArrayUpdates = function getStructArrayUpdates(localStructArraysState) {
  const updates = []
  this.schema.structArrays.forEach((structArray) => {
    const localStructArrayState = localStructArraysState[structArray.name]
    const chainStructArrayState = this.chainState.structArrays[structArray.name]
    console.log('localStructArrayState', localStructArrayState)
    console.log('chainStructArrayState', chainStructArrayState)
    localStructArrayState.forEach((localStructState, index) => {
      const id = new Amorph(index, 'number')
      if (index >= chainStructArrayState.length) {
        const variableValues = structArray.variables.map((variable) => {
          return localStructState[variable.name]
        })
        updates.push(new Update(structArray.addMethodAbi, variableValues))
        return
      }
      const chainStructState = chainStructArrayState[index]
      structArray.variables.forEach((variable) => {
        const localStateValue = localStructState[variable.name]
        const chainStateValue = chainStructState[variable.name]
        if (!chainStateValue.equals(localStateValue)) {
          console.log(variable.setMethodAbi, chainStateValue, localStateValue)
          updates.push(
            new Update(variable.setMethodAbi, [id, localStateValue])
          )
        }
      })
    })
  })
  return updates
}

Statesync.prototype.download = function download() {
  console.log('download')
  return Q.all([
    this.fetchVariables().then((variables) => {
      this.chainState.variables = variables
    }),
    this.fetchStructArrays().then((structArrays) => {
      this.chainState.structArrays = structArrays
    })
  ])
}

Statesync.prototype.fetchVariables = function fetchVariables() {
  const variables = {}
  const fetches = this.schema.variables.map((variable) => {
    return this.fetch(variable.getMethodAbi, []).then((value) => {
      variables[variable.name] = value
    })
  })
  return Q.all(fetches).then(() => {
    return variables
  })
}

Statesync.prototype.fetchStructArrays = function fetchStructArrays() {
  const structArrays = {}
  const fetches = this.schema.structArrays.map((structArray) => {
    structArrays[structArray.name] = []
    return this.fetch(structArray.getLengthMethodAbi, []).then((length) => {
      structArrays[structArray.name].length = length.to('number')
      const fetchStructPromises = _.range(length.to('number')).map((indexNumber) => {
        const index = new Amorph(indexNumber, 'number')
        return this.fetch(structArray.getMethodAbi, [index]).then((values) => {
          const struct = {}
          structArray.variables.forEach((variable, variableIndex) => {
            struct[variable.name] = values[variableIndex]
          })
          structArrays[structArray.name][indexNumber] = struct
        })
      })
      return Q.all(fetchStructPromises)
    })
  })
  return Q.all(fetches).then(() => {
    return structArrays
  })
}

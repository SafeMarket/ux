function Statesync(schema) {
  this.schema = schema
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
    if (chainStateValue === null || !localStateValue.equals(chainStateValue)) {
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
    localStructArrayState.forEach((localStructState, index) => {
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
        if (!localStateValue.equals(chainStateValue)) {
          updates.push(
            new Update(variable.setMethodAbi, localStateValue)
          )
        }
      })
    })
  })
  return updates
}

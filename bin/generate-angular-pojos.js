const dirToJson = require('dir-to-json')
const fs = require('fs')

const moduleTypes = ['controllers', 'directives', 'filters']
const fileLines = ['const modules = {}']

console.log('Starting')

moduleTypes.forEach((moduleType) => {
  console.log(moduleType)
  fileLines.push(`modules.${moduleType} = {}`)
  dirToJson(`./lib/${moduleType}`, (err, dirTree) => {
    if (err) {
      console.log(err)
      throw err
    } else {
      dirTree.children.forEach((child) => {
        const fileName = child.name
        if (fileName.indexOf('.js') === -1) { return }
        const moduleName = child.name = fileName.split('.js')[0]
        const path = `../lib/${moduleType}/${fileName}`
        fileLines.push(`modules.${moduleType}.${moduleName} = require('${path}')`)
      })
      done()
    }
  })
})

let i = 0
function done() {
  i += 1
  if (i === moduleTypes.length) {
    try {
      fileLines.push('module.exports = modules')
      fs.writeFileSync('./generated/angularModulesPojo.gs', fileLines.join('\r\n'))
    } catch (_err) {
      console.log(_err)
    }
  }
}

const fs = require('fs')
const yaml = require('yamljs')

module.exports = function generateCurrenciesAscii() {
  const path = 'generated/blurbsPojo.gs'
  const files = fs.readdirSync('blurbs')
  const blurbsPojo = {}

  files.forEach((file) => {
    const blurbYml = fs.readFileSync(`blurbs/${file}`, 'utf8')
    const blurbId = file.split('.')[0]
    blurbsPojo[blurbId] = yaml.parse(blurbYml)
  })

  const blurbsJson = JSON.stringify(blurbsPojo, null, 2)
  fs.writeFileSync(path, `module.exports = ${blurbsJson}`)
  console.log(`Wrote blurbsPojo to ${path}`.green)
}

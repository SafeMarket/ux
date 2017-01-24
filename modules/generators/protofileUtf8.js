const fs = require('fs')

function cleanString(input) {
  let output = ''
  for (let i = 0; i < input.length; i += 1) {
    if (input.charCodeAt(i) <= 127) {
      output += input.charAt(i)
    }
  }
  return output
}

module.exports = function writeAuthfile() {
  const protofileUtf8 = cleanString(fs.readFileSync('./safemarket.proto', 'utf8'))
  const path = 'generated/protofileUtf8.js'
  fs.writeFileSync(path, `module.exports = \`${protofileUtf8}\`\n`)
  console.log(`Wrote protofileUtf8 to ${path}`.green)
}

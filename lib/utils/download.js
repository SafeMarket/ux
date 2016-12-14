/* globals document */

module.exports = function download(text, filename) {
  const element = document.createElement('a')
  const encodedURIComponent = encodeURIComponent(text)
  const href = `data:text/plain;charset=utf-8,${encodedURIComponent}`
  element.setAttribute('href', href)
  element.setAttribute('download', filename)
  element.style.display = 'none'
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}

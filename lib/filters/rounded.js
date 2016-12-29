module.exports = function roundedFilter() {
  return function roundedFilterFunction(number) {
    const places = number < 1 ? 4 : 2
    return number.toFixed(places)
  }
}

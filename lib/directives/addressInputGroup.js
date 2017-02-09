module.exports = function pricemorphInputGroupDirective() {
  return {
    templateUrl: 'html/addressInputGroup.html',
    scope: {
      address: '=addressInputGroup'
    }
  }
}

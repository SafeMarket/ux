const DisputeSecondsOption = require('./classes/DisputeSecondsOption')

module.exports = {
  0: new DisputeSecondsOption(0, 'No disputes allowed'),
  86400: new DisputeSecondsOption(86400, '1 Day'),
  259200: new DisputeSecondsOption(259200, '3 Days'),
  604800: new DisputeSecondsOption(604800, '7 Days'),
  1209600: new DisputeSecondsOption(1209600, '14 Days'),
  2592000: new DisputeSecondsOption(1209600, '30 Days'),
  5184000: new DisputeSecondsOption(1209600, '60 Days'),
  7776000: new DisputeSecondsOption(1209600, '90 Days')
}

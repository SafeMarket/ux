const mochaReporter = require('mocha-spectreport-reporter')

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['spec/index.js'],
  rootElement: '[ng-app]',
  framework: 'mocha',
  mochaOpts: {
    reporter: mochaReporter,
    reporterOptions: {
      console: true,
      screenshot: false
    },
    ui: 'bdd',
    timeout: 5000,
    bail: true
  }
}

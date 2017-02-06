const bulk = require('bulk-require')
const _ = require('lodash')
const angular = require('angular')
const ultralightbeam = require('./ultralightbeam')

window.angular = angular

// eslint-disable-next-line import/no-unresolved
require('angular-growl-v2/build/angular-growl.js')

require('angular-ui-bootstrap')
require('angular-ui-router')
require('angular-route')
require('angular-timeago')
require('angular-marked')
require('angular-promise-extras-real')
require('iso-3166-country-codes-angular')
require('ng-file-upload')

const app = angular.module('app', [
  'ui.bootstrap',
  'ui.router',
  'angular-growl',
  'ngRoute',
  'yaru22.angular-timeago',
  'hc.marked',
  'ngPromiseExtras',
  'iso-3166-country-codes',
  'ngFileUpload'
])

const controllers = bulk(__dirname, './controllers/**/*.js').controllers
const directives = bulk(__dirname, './directives/**/*.js').directives
const filters = bulk(__dirname, './filters/**/*.js').filters
const services = bulk(__dirname, './services/**/*.js').services

_.forEach(controllers, (controller, controllerName) => {
  app.controller(controllerName, controller)
})

_.forEach(directives, (directive, directiveName) => {
  app.directive(directiveName, directive)
})

_.forEach(filters, (filter, filterName) => {
  app.filter(filterName, filter)
})

_.forEach(services, (service, serviceName) => {
  app.service(serviceName, service)
})

app.config((growlProvider, $stateProvider, $urlRouterProvider, $compileProvider) => {

  growlProvider.globalTimeToLive(5000)
  growlProvider.onlyUniqueMessages(false)
  growlProvider.globalDisableCountDown(true)
  $compileProvider.debugInfoEnabled(true)

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'html/home.html'
    })
    .state('address', {
      url: '/address/:addressHexPrefixed',
      templateUrl: 'html/addressLookup.html',
      controller: 'AddressLookup'
    })
    .state('store', {
      abstract: true,
      url: '/store/:slug',
      templateUrl: 'html/store.html',
      controller: 'Store'
    })
    .state('store.about', {
      url: '/about',
      templateUrl: 'html/store.about.html'
    })
    .state('store.products', {
      url: '/products',
      templateUrl: 'html/store.products.html'
    })
    .state('store.orders', {
      url: '/orders',
      templateUrl: 'html/store.orders.html'
    })
    .state('arbitrator', {
      abstract: true,
      url: '/arbitrator/:slug',
      templateUrl: 'html/arbitrator.html',
      controller: 'Arbitrator'
    })
    .state('arbitrator.about', {
      url: '/about',
      templateUrl: 'html/arbitrator.about.html'
    })
    .state('arbitrator.orders', {
      url: '/orders',
      templateUrl: 'html/arbitrator.orders.html'
    })
    .state('order', {
      url: '/orders/:orderRegAddressHexPrefixed/:orderIdNumber',
      templateUrl: 'html/order.html'
    })


  $urlRouterProvider.otherwise('/')

})

app.run(($rootScope, $interval, $timeout, timeAgoSettings, $q) => {

  ultralightbeam.defer = $q.defer
  ultralightbeam.resolve = $q.resolve
  ultralightbeam.reject = $q.reject

  timeAgoSettings.breakpoints.secondsToMinute = 60
  timeAgoSettings.allowFuture = true

})

module.exports = app

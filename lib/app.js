/* globals document */

function setLoad(x) {
  document.getElementById('load').innerText = x
}

setLoad(5)

const bulk = require('bulk-require')

setLoad(6)

const _ = require('lodash')

setLoad(7)

const angular = require('angular')

setLoad(8)
const ultralightbeam = require('./ultralightbeam')

setLoad(12)
window.angular = angular

// eslint-disable-next-line import/no-unresolved
require('angular-ui-bootstrap')
require('angular-ui-router')
require('angular-route')
require('angular-timeago')
require('angular-marked')
require('angular-promise-extras-real')
require('ng-file-upload')
require('angularjs-toaster')

document.getElementById('load').innerText = 30

const app = angular.module('app', [
  'ui.bootstrap',
  'ui.router',
  'ngRoute',
  'yaru22.angular-timeago',
  'hc.marked',
  'ngPromiseExtras',
  'ngFileUpload',
  'toaster'
])

const controllers = bulk(__dirname, './controllers/**/*.js').controllers
const directives = bulk(__dirname, './directives/**/*.js').directives
const filters = bulk(__dirname, './filters/**/*.js').filters
const services = bulk(__dirname, './services/**/*.js').services

document.getElementById('load').innerText = 50

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

app.config(($stateProvider, $urlRouterProvider, $compileProvider) => {

  $compileProvider.debugInfoEnabled(true)

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'html/home.html'
    })
    .state('store', {
      abstract: true,
      url: '/store/:idAscii',
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
    .state('product', {
      url: '/store/:idAscii/products/:indexNumberString',
      templateUrl: 'html/product.html',
      controller: 'Product'
    })
    .state('order', {
      url: '/orders/:orderRegAddressHexPrefixed/:orderIdNumber',
      templateUrl: 'html/order.html'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'html/login.html',
      controller: 'Login'
    })


  $urlRouterProvider.otherwise('/')

})

document.getElementById('load').innerText = 70

app.run(($rootScope, $interval, $timeout, timeAgoSettings, $q) => {

  ultralightbeam.defer = $q.defer
  ultralightbeam.resolve = $q.resolve
  ultralightbeam.reject = $q.reject

  timeAgoSettings.breakpoints.secondsToMinute = 60
  timeAgoSettings.allowFuture = true

})

document.getElementById('load').innerText = 99

module.exports = app

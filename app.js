/* globals document */
/* eslint global-require: "off", no-path-concat: "off", prefer-template: "off" */

const ultralightbeam = require('./lib/ultralightbeam')
const _ = require('lodash')
const angular = require('angular')
const parseAuthfile = require('./lib/utils/parseAuthfile')
const authfileBase2048English = require('./generated/authfile.gs')
const Amorph = require('amorph')

angular.injector(['ng']).invoke(['$q', ($q) => {
  ultralightbeam.defer = $q.defer
  ultralightbeam.resolve = $q.resolve
  ultralightbeam.reject = $q.reject
}])

require('angular-ui-bootstrap')
require('angular-ui-router')
require('angular-route')
require('angular-timeago')
require('angular-marked')
require('angular-promise-extras-real')
require('ng-file-upload')
require('angularjs-toaster')

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

const angularModulesPojo = require('./generated/angularModulesPojo.gs')

_.forEach(angularModulesPojo.controllers, (controller, controllerName) => {
  app.controller(controllerName, controller)
})

_.forEach(angularModulesPojo.directives, (directive, directiveName) => {
  app.directive(directiveName, directive)
})

_.forEach(angularModulesPojo.filters, (filter, filterName) => {
  app.filter(filterName, filter)
})

_.forEach(angularModulesPojo.services, (service, serviceName) => {
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
      url: '/stores/:idAscii',
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
    .state('store.product', {
      url: '/products/:indexNumberString',
      templateUrl: 'html/store.product.html',
      controller: 'Product'
    })
    .state('cart', {
      url: '/cart',
      templateUrl: 'html/cart.html',
      controller: 'Cart'
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
    .state('checkout', {
      url: '/checkout',
      templateUrl: 'html/checkout.html',
      controller: 'Checkout'
    })

  $urlRouterProvider.otherwise('/')

})

app.run(($rootScope, $interval, $timeout, timeAgoSettings) => {
  timeAgoSettings.breakpoints.secondsToMinute = 60
  timeAgoSettings.allowFuture = true
})

angular.bootstrap(document, ['app'])


const authfile = new Amorph(authfileBase2048English, 'base2048.english')
const profile = parseAuthfile(authfile, new Amorph('password', 'ascii'))
ultralightbeam.options.defaultAccount = profile.account

(function() {
  'use strict';

  angular.module('app').config(config)

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider']

  function config($stateProvider, $urlRouterProvider, $locationProvider){

    $locationProvider.html5Mode(true)

    $stateProvider
      .state({
        name: 'app',
        abstract: true,
        component: 'app',
      })
      .state({
        name: 'hardWare',
        parent: 'app',
        url: '/',
        component: 'hardWare',
      })
      .state({
        name: 'about',
        parent: 'app',
        url: '/about',
        component: 'about',
      })
      .state({
        name: 'contact',
        parent: 'app',
        url: '/contact',
        component: 'contact',
      })
      .state({
        name: 'tasks',
        parent: 'app',
        url: '/tasks',
        component: 'tasks',
      })
  }

}());
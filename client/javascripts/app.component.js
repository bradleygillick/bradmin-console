(function() {
  'use strict'

  angular.module('app')
    .component('app', {
      templateUrl: '/javascripts/app.template.html',
      controller: controller
    })

  controller.$inject = ['$http']
  function controller($http) {
    const vm = this

    vm.$onInit = onInit

    function onInit() {

    }

  }

}());

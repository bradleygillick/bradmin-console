(function() {
  'use strict'

  angular.module('app')
    .component('about', {
      templateUrl: '/javascripts/about.template.html',
      controller: controller
    })

  controller.$inject = ['$http', '$stateParams', '$state']
  function controller($http, $stateParams, $state) {
    const vm = this

    vm.$onInit = onInit

    function onInit() {

    }

  }

}());
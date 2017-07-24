(function () {
  'use strict'

  angular.module('app')
    .component('hardWare', {
      templateUrl: '/javascripts/hard-ware.template.html',
      controller: controller
    })

  controller.$inject = ['$http', '$stateParams', '$state', '$window', 'moment']

  function controller($http, $stateParams, $state, $window) {
    const vm = this

    vm.$onInit = onInit
    vm.getDiskSize = getDiskSize
    vm.getCPU = getCPU
    vm.getRAM = getRAM

    function onInit() {
      vm.cpu = 0;
      vm.ram = 0;
      vm.network = {};
      vm.hostname = "";
      vm.model = "";
      vm.speed = 0;
      vm.release = "";
    }

    function getCPU() {
      getMachineStats();
      return [vm.time, vm.cpu]
    };

    function getRAM() {
      getRamStats();
      return [vm.time, vm.ram];
    };

    function makeChart() {
      var chart = new CanvasJS.Chart("chartContainer", {
        title: {
          text: "255 GB"
        },
        animationEnabled: true,
        theme: "theme2",
        data: [{
          type: "doughnut",
          indexLabelFontFamily: "Garamond",
          indexLabelFontSize: 20,
          startAngle: 0,
          indexLabelFontColor: "dimgrey",
          indexLabelLineColor: "darkgrey",
          toolTipContent: "{y} %",

          dataPoints: [{
              y: 0,
              indexLabel: ""
            },
            {
              y: 1,
              indexLabel: "Used {y}%"
            },
            {
              y: 1,
              indexLabel: "Free {y}%"
            }
          ]
        }]
      });
      return chart;
    }


    function getMachineStats() {
      $http.get('/api/hwvalues').then((response) => {
        vm.time = response.data.time;
        vm.cpu = response.data.cpu;
        vm.ram = response.data.ram;
        vm.network = response.data.network;
        vm.hostname = response.data.hostname;
        vm.model = response.data.model;
        vm.speed = response.data.speed;
        vm.arch = response.data.arch;
        vm.platform = response.data.platform;
        vm.release = response.data.release;
        vm.type = response.data.type;
        vm.uptime = response.data.uptime;
      })
    }

    function getRamStats() {
      $http.get('/api/hwvalues/memdetails').then((response) => {
        vm.ramSpeed = response.data.speed;
        vm.ramSize = Number((response.data.size[0]))*2;
        vm.ramStatus = response.data.status;
        vm.ramType = response.data.type;
      })
    }

    function getDiskSize() {
      $http.get('/api/hwvalues/size').then(function (result) {
        vm.size = result.data;
      })
      return $http.get('/api/hwvalues/used')
    }

    vm.chart = makeChart();

    vm.getDiskSize().then(function (result) {
      vm.used = result.data;
      vm.unused = ((vm.size - vm.used) / vm.size) * 100;
      vm.diskUsed = (vm.used / vm.size) * 100;
      vm.chart.options.data[0].dataPoints[1].y = vm.unused.toFixed(2);
      vm.chart.options.data[0].dataPoints[2].y = vm.diskUsed.toFixed(2);
      vm.chart.options.title.text = `Size: ${vm.size} GB`;
      vm.chart.render();
    })

  }

}());
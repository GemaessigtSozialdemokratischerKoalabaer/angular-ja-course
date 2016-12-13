(function () {
'use strict';

angular.module('MenuApp')
.controller('DataController', DataController);

DataController.$inject = ['$rootScope']
function DataController($rootScope) {
  var $ctrl = this;
  var cancellers = [];
  $ctrl.$onInit = function () {
    console.log("DataController initializing");
    var cancel = $rootScope.$on('$stateChangeStart',
      function(event, toState, toParams, fromState, fromParams, options){
        console.log('$stateChangeStart');
      });
    cancellers.push(cancel);

    cancel = $rootScope.$on('$stateChangeSuccess',
      function(event, toState, toParams, fromState, fromParams){
        console.log('$stateChangeSuccess');
      });
    cancellers.push(cancel);

    cancel = $rootScope.$on('$stateChangeError',
      function(event, toState, toParams, fromState, fromParams, error){
        console.log('$stateChangeError');
        console.log('error', error);
      });
    cancellers.push(cancel);
  };

  $ctrl.$onDestroy = function () {
    cancellers.forEach(function (item) {
      item();
    });
  };

}

})();

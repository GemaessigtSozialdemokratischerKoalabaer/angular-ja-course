(function () {
'use strict';

angular.module('Data')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

MenuDataService.$inject = ['$http', 'ApiBasePath', '$q', '$rootScope', '$stateParams'];
function MenuDataService($http, ApiBasePath, $q, $rootScope, $stateParams) {
  var dataService = this;
  dataService.shortName = 'A';

  dataService.getAllCategories = function () {
    console.log("MenuDataService.getAllCategories called");
    var deferred = $q.defer();
    var categoryItems = [];
    $http({
      method: "GET",
      url: (ApiBasePath + "/categories.json")
    }).then( function(result){
      console.log('result.data', result.data);
      deferred.resolve(result.data);
    });

    return deferred.promise;
  };

  dataService.getItemsForCategory = function(shortName) {
    console.log("MenuDataService.getItemsForCategory called, with", shortName);
    var deferred = $q.defer();
    $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json?category=" + shortName)
    }).then( function(result){
      console.log('result.data', result.data);
      deferred.resolve(result.data.menu_items);
    });

    return deferred.promise;
  };

}
})();

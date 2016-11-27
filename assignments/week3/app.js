(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;
  menu.selector = "";
  menu.origTitle  = "Matching items";
  menu.title = menu.origTitle + " (Not searched yet)";
  menu.items;
  menu.error = "";

  menu.findMatching = function() {
    var promise = MenuSearchService.getMenuItems(menu.selector);
    promise.then(function(result) {
      console.log("Result:", result);
      menu.items = result.menu_items;
      menu.title = menu.origTitle + " (" + menu.items.length + " items )";
      menu.error = "";
    }, function(error) {
      menu.items = [];
      menu.title = menu.origTitle + " (0 items )";
      menu.error = "Nothing found!";
    });
  };

  menu.removeItem = function (itemIndex) {
    menu.items.splice(itemIndex,1);
    menu.title = menu.origTitle + " (" + menu.items.length + " items )";
  };
}

MenuSearchService.$inject = ['$http', 'ApiBasePath', '$q'];
function MenuSearchService($http, ApiBasePath, $q) {
  var service = this;
  service.getMenuItems = function (itemSelector) {
    var deferred = $q.defer();
    var items = {
      menu_items: []
    }
    var promise = getItems(itemSelector);
    promise.then(function(result) {
        console.log("result:", result)
        var menuItems = result.data.menu_items;
        var lookFor = itemSelector.toLowerCase();
        for(var i=0; i < menuItems.length; i++) {
          if(menuItems[i].name.toLowerCase().indexOf(lookFor) !== -1) {
            items.menu_items.push(menuItems[i]);
          }
        }
        if (items.menu_items.length === 0) {
          console.log("Nothing found");
          deferred.reject(items);
        } else {
          console.log("Items found ", items.menu_items.length);
          deferred.resolve(items);
        }
    });
    return deferred.promise;
  };

  function getItems(itemSelector) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    })
    return response;
  };
}

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      onRemove: '&',
      listTitle: '@title',
      listError: '@error'
    },
    restrict: 'E',
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}


function FoundItemsDirectiveController() {
  var list = this;
}
})();

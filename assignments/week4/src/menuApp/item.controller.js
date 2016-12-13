(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);


ItemsController.$inject = ['MenuDataService', 'items', '$stateParams'];
function ItemsController(MenuDataService, items, $stateParams) {
  var itemsList = this;
  itemsList.items = items;
}

})();

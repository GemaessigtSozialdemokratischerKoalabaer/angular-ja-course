(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);


ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBy = this;
  toBy.amount = "";
  toBy.name = "";
  toBy.items = ShoppingListCheckOffService.toByList();

  toBy.addToBy = function() {
    ShoppingListCheckOffService.addToBy(toBy.name, toBy.amount);
    toBy.amount = "";
    toBy.name = "";
  }
  toBy.bought = function(index){
    ShoppingListCheckOffService.bought(index);
  }
  toBy.canBeAdded = function(){
    return toBy.name.length === 0 || toBy.amount.length === 0 ;
  }
  toBy.everyThinkBought = function() {
    return toBy.items.length == 0 && ShoppingListCheckOffService.boughtList().length > 0;
  }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var bought = this;
  bought.items = ShoppingListCheckOffService.boughtList();
  bought.isEmpty = function() {
    return bought.items.length == 0;
  }
}

function ShoppingListCheckOffService() {
  var checkOffList = this;
  var toBy = [{ name: "steak", quantity: 10 },
              { name: "bear", quantity: 20 },
              { name: "ketchup", quantity: 1 },
              { name: "salat", quantity: 2 },
              { name: "tomatoes", quantity: 5 }];
  var bought = [];

  checkOffList.addToBy = function (itemName, quantity) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      toBy.push(item);
  };

  checkOffList.toByList = function () {
    return toBy;
  }

  checkOffList.bought = function(index) {
    bought.push(toBy[index]);
    toBy.splice(index, 1);
  }

  checkOffList.boughtList = function() {
    return bought;
  }
 }
})();

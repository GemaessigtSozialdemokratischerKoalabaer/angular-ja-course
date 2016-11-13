(function() {
'use strict';

angular.module('LunchCheckerApp', [])
.controller('LunchCheckerController', LunchCheckerController);

LunchCheckerController.$inject = ['$scope'];
function LunchCheckerController($scope) {
  $scope.lunch = "";
  $scope.defaultMessage = "Enter comma seperated List of dishes and press button.";
  $scope.tooMuchMessage = "Too much!";
  $scope.enjoyMessage = "Enjoy!";
  $scope.lunchMessage = $scope.defaultMessage;

  $scope.presentScore = function() {
    var dishCounter = countDishes();
    if (dishCounter === 0) {
      $scope.lunchMessage = $scope.defaultMessage;
    } else {
      if (dishCounter < 4) {
        $scope.lunchMessage = $scope.enjoyMessage;
      } else {
        $scope.lunchMessage = $scope.tooMuchMessage;
      }
    }
  };

  $scope.logLunch = function() {
    console.log("Counter: ", countDishes());
  };

  function countDishes() {
    var dishes = $scope.lunch.replace(/\s/g, '').split(',');
    var dishCounter = dishes.length;
    for (var i = 0; i < dishes.length; i++) {
      if (dishes[i].length === 0) {
        dishCounter--;
      }
    }
    return dishCounter;
  };
}

})();

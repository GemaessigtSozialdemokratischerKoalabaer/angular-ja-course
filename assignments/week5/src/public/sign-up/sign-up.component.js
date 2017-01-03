(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController)
.controller('MyInfoController', MyInfoController)
.service('SignUpService', SignUpService)
.directive('dishValidation', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attr, mCtrl) {
        mCtrl.$asyncValidators.dishValidation = function(modelValue, viewValue) {
          return scope.signUpCtrl.checkDish(viewValue);
        };
    }
  }
});

SignUpController.$inject = ['MenuService', 'SignUpService'];
function SignUpController(MenuService, SignUpService) {
  var $ctrl = this;
  $ctrl.user = SignUpService.getUser();

  $ctrl.submit = function () {
    SignUpService.setUser($ctrl.user);
    $ctrl.stored = true;
  };

  $ctrl.checkDish = function (value) {
    return  MenuService.checkMenuItem(value).then(function(result) {
      $ctrl.user.title = result.data.name;
      $ctrl.user.description = result.data.description;
    });
  };
};

MyInfoController.$inject = ['ApiPath', 'SignUpService'];
function MyInfoController(ApiPath, SignUpService) {
  var $ctrl = this;
  $ctrl.user = SignUpService.getUser();
  $ctrl.userDataSet = ($ctrl.user.firstname.length !== 0);
  $ctrl.dishPictureUrl = "";
  if ($ctrl.userDataSet) {
    $ctrl.dishPictureUrl = ApiPath + "/images/" + $ctrl.user.dish + ".jpg";
  };
};

function SignUpService() {
  var service = this;
  service.user = {
      firstname:"",lastname:"",email:"",phone:"",dish:"",title:"",description:""
  }
  service.getUser = function() {
    console.log("SignUpService user:", service.user);
    return service.user;
  }
  service.setUser = function(user) {
    service.user = user;
  }
};

})();

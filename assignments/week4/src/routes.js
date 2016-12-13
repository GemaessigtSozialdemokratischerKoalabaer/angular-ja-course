(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menuApp/templates/home.template.html',
    controller: 'DataController as DataController'
  })

  .state('categories', {
    url: '/categories',
    controller: 'CategoriesController as categoryList',
    templateUrl: 'src/menuApp/templates/categories.template.html',
    resolve: {
      categories: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]

    }
  })

  .state('items', {
    url: '/items/{shortName}',
    templateUrl: 'src/menuApp/templates/items.template.html',
    controller: "ItemsController as itemList",
    resolve: {
      items: ['MenuDataService', '$stateParams', function (MenuDataService, $stateParams) {
        return MenuDataService.getItemsForCategory($stateParams.shortName);
      }]
    }
  });

}

})();

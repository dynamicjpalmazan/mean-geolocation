 // create the module and name it scotchApp
 // also include ngRoute for all our routing needs
 var scotchApp = angular.module('scotchApp', ['ngRoute',
     'ngCookies',
     'controllerStoreDetail', 'controllerStoreCategory',
     'controllerStoreQuery', 'controllerUserDetail',
     'controllerUserAuthentication', 'geolocation',
     'gservice', 'aservice',
     'datatables'
 ]);

 // configure our routes
 scotchApp.config(function($routeProvider) {
     $routeProvider

     // route for the user dashboard page
         .when('/', {
         templateUrl: 'partials/user/user_dashboard.html',
         controller: 'mainController'
     })

     // route for the user store-list page
     .when('/store-list', {
         templateUrl: 'partials/user/user_stores.html',
         controller: 'mainController'
     })

     // route for the register page
     .when('/register', {
         templateUrl: 'partials/main/register.html',
         controller: 'mainController'
     })

     // route for the admin home page
     .when('/dashx', {
         templateUrl: 'partials/administrator/admin_dashboard.html',
         controller: 'dashxController'
     })

     // route for the store category maintenance page
     .when('/store_categories', {
         templateUrl: 'partials/administrator/admin_storecategory.html',
         controller: 'storeCategoryController'
     })

     // route for the store detail maintenance page
     .when('/store_details', {
         templateUrl: 'partials/administrator/admin_storedetail.html',
         controller: 'storeDetailController'
     })

     // route for the user detail maintenance page
     .when('/user_details', {
         templateUrl: 'partials/administrator/admin_userdetail.html',
         controller: 'userDetailController'
     })

     // route for the archive page
     .when('/archive', {
         templateUrl: 'partials/administrator/admin_archives.html',
         controller: 'contactController'
     })

     // route back to login page
     .otherwise({
         redirectTo: '/dashx' // change to login '/'
     });

 });

 // create the controller and inject Angular's $scope
 scotchApp.controller('mainController', ['$scope', '$location', '$window', 'aservice',
     function($scope, $location, $window, aservice) {

         slider();

         // retrieve 'location'
         $scope.location = $location.path();

         if ($location.path() === '/' || $location.path() === '/store-list') {

             $scope.bodyClass = 'background:#F7F7F7';

         } else {

             $scope.bodyClass = 'background:#2a3f54';

         }

         // method changeView
         $scope.changeView = function(view) {

                 // update path
                 $location.path(view);

                 // refresh window
                 $window.location.reload();

             } // end method changeView

          $scope.logout = function() {

            $scope.changeView('/');

            aservice.ClearCredentials();

          }

     }
 ]);

 scotchApp.controller('dashxController', function($scope) {

     initMap();
     slider();

 });

 scotchApp.controller('storeDetailController', function($scope) {

     // Initialize map
     initMap();

     // Hide store list div | toggle on-click
     toggleList();


 });

 scotchApp.controller('storeCategoryController', function($scope) {


     //akjhdh

 });

 scotchApp.controller('userDetailController', function($scope) {

     //akjhdh

 });

 scotchApp.controller('contactController', function($scope) {

     //dlfsdjf

 });

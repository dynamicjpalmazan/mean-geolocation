 // create the module and name it scotchApp
 // also include ngRoute for all our routing needs
 var scotchApp = angular.module('scotchApp', ['ngRoute', 'controllerStoreDetail', 'controllerStoreCategory', 'geolocation', 'gservice', 'datatables']);

 // configure our routes
 scotchApp.config(function($routeProvider) {
     $routeProvider

     // route for the login page
         .when('/', {
         templateUrl: 'partials/main/login.html',
         controller: 'mainController'
     })

     // route for the register page
     .when('/register', {
         templateUrl: 'partials/main/register.html',
         controller: 'mainController'
     })

     // route for the home page
     .when('/dashx', {
         templateUrl: 'partials/administrator/admin_dashboard.html',
         controller: 'dashxController'
     })

     // route for the about page
     .when('/store_categories', {
         templateUrl: 'partials/administrator/admin_storecategory.html',
         controller: 'storeCategoryController'
     })

     // route for the about page
     .when('/store_details', {
         templateUrl: 'partials/administrator/admin_storedetail.html',
         controller: 'storeDetailController'
     })

     // route for the about page
     .when('/user_details', {
         templateUrl: 'partials/administrator/admin_storecategory.html',
         controller: 'storeCategoryController'
     })

     // route for the contact page
     .when('/contact', {
         templateUrl: 'partials/administrator/admin_storedetail.html',
         controller: 'contactController'
     })

     // route back to login page
     .otherwise({
         redirectTo: '/dashx'
     });

 });

 // create the controller and inject Angular's $scope
 scotchApp.controller('mainController', ['$scope', '$location', '$window',
     function($scope, $location, $window) {

         // retrieve 'location'
         $scope.location = $location.path();

         if ($location.path() === '/' || $location.path() === '/register') {

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

     }
 ]);

 scotchApp.controller('dashxController', function($scope) {

     initMap();

 });

 scotchApp.controller('storeDetailController', function($scope) {

     initMap();

 });

 scotchApp.controller('storeCategoryController', function($scope) {


 });

 scotchApp.controller('contactController', function($scope) {
     $scope.message = 'Contact us! JK. This is just a demo.';
 });

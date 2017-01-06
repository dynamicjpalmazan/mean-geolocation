// Creates the controllerUserAuthentication Module and Controller.
var controllerUserAuthentication = angular.module('controllerUserAuthentication', ['ngCookies']);

controllerUserAuthentication
    .controller('controllerUserAuthentication', ['$scope', '$rootScope', '$location', '$window', 'aservice',

        function($scope, $rootScope, $location, $window, aservice) {

            // Get active user, if any
            var active = aservice.GetCredentials();
            //alert(active);

            // if (active === true) {
            //
            //   $location.path('/dashx');
            //   $window.location.reload();
            //
            // }

            // Reset login credentials
            //aservice.ClearCredentials();

            $scope.login = function() {

                $scope.dataLoading = true;

                aservice.Login($scope.username, $scope.password, function(response) {

                    if (response.success) {

                        aservice.SetCredentials($scope.username, $scope.password);
                        $location.path('/dashx');
                        $window.location.reload();

                    } else {

                        $scope.error = response.message;
                        $scope.dataLoading = false;

                    } // end conditional statements

                }); // end aservice.Login

            }; // end $scope.login function

        } // end --

    ]); // end controllerUserAuthentication controller

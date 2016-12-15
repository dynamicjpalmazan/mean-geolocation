// Creates the controllerStoreDetail Module and Controller. Note that it depends on the 'geolocation' module and service.
var controllerStoreDetail = angular.module('controllerStoreDetail', ['geolocation', 'gservice']);
controllerStoreDetail.controller('controllerStoreDetail', function($scope, $http, $rootScope, geolocation, gservice) {

    // Initializes Variables
    // ----------------------------------------------------------------------------
    $scope.formData = {};
    var coords = {};
    var lat = 0;
    var long = 0;

    // Set initial coordinates to the center of the US
    $scope.formData.txtLatitude = 39.500;
    $scope.formData.txtLongitude = -98.350;

    // Get User's actual coordinates based on HTML5 at window load
    geolocation.getLocation().then(function(data) {

        // Set the latitude and longitude equal to the HTML5 coordinates
        coords = {
            lat: data.coords.latitude,
            long: data.coords.longitude
        };

        // Display coordinates in location textboxes rounded to three decimal points
        $scope.formData.txtLongitude = parseFloat(coords.long).toFixed(3);
        $scope.formData.txtLatitude = parseFloat(coords.lat).toFixed(3);

        gservice.refresh($scope.formData.txtLatitude, $scope.formData.txtLongitude);

    });

    // Functions
    // ----------------------------------------------------------------------------
    // Get coordinates based on mouse click.
    $rootScope.$on("clicked", function() {

        // Run the gservice functions associated with identifying coordinates
        $scope.$apply(function() {
            $scope.formData.txtLatitude = parseFloat(gservice.clickLat).toFixed(3);
            $scope.formData.txtLongitude = parseFloat(gservice.clickLong).toFixed(3);
        });
    });

    // Read all active stores
    $scope.getActiveStore= function() {

        // Perform an AJAX call to get all of the records in the db.
        $http.get('/stores')
            .success(function(response) {

                $scope.activeStores = response;

            }).error(function() {

            });

    }; // end function getActiveStore

    // Read all archived stores
    $scope.getInactiveStore = function() {

        // Perform an AJAX call to get all of the records in the db.
        $http.get('/inactive-stores')
            .success(function(response) {

                $scope.inactiveStores = response;

            }).error(function() {

            });

    }; // end function getInactiveStore

    // Create a new store
    $scope.createStore = function() {
        // Grabs all of the text box fields
        var storeData = {
            storeName: $scope.formData.txtStoreName,
            storeAddress: $scope.formData.txtStoreAddress,
            storeLocation: [$scope.formData.txtLongitude, $scope.formData.txtLatitude]
        };

        // Saves the store data to the db
        $http.post('/stores', storeData)
            .success(function(data) {

                // Once complete, clear the form (except location)
                $scope.formData.txtStoreName = "";
                $scope.formData.txtStoreAddress = "";

                // Display success message
                new PNotify({
                    title: 'Success!',
                    text: 'You\'ve successfully added a new store!',
                    type: 'success'
                });

                // Refresh the map with new data
                gservice.refresh($scope.formData.txtLatitude, $scope.formData.txtLongitude);

            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // Interval-based Functions
    // ----------------------------------------------------------------------------
    // Refresh table data (active and inactive stores) every 10secs
    // $interval(function() {
    //
    //     $scope.getActiveStore();
    //     $scope.getInactiveStore();
    //
    // }, 10000);


    // initialization Functions
    // ----------------------------------------------------------------------------
    // Get active and inactive stores
    // $scope.getActiveStore();
    // $scope.getInactiveStore();

});

// Creates the addCtrl Module and Controller. Note that it depends on 'geolocation' and 'gservice' modules.
var controllerStoreQuery = angular.module('controllerStoreQuery', ['geolocation', 'gservice']);
controllerStoreQuery.controller('controllerStoreQuery', function($scope, $log, $http, $rootScope, geolocation, gservice) {

    // Initializes Variables
    // ----------------------------------------------------------------------------
    $scope.formData = {};
    var queryBody = {};

    // Functions
    // ----------------------------------------------------------------------------
    // Get User's actual coordinates based on HTML5 at window load
    geolocation.getLocation().then(function(data) {
        coords = {
            lat: data.coords.latitude,
            long: data.coords.longitude
        };

        // Set the latitude and longitude equal to the HTML5 coordinates
        $scope.formData.txtLongitude = parseFloat(coords.long).toFixed(3);
        $scope.formData.txtLatitude = parseFloat(coords.lat).toFixed(3);
    });

    // Get coordinates based on mouse click. When a click event is detected....
    $rootScope.$on("clicked", function() {

        // Run the gservice functions associated with identifying coordinates
        $scope.$apply(function() {
            $scope.formData.txtLatitude = parseFloat(gservice.clickLat).toFixed(3);
            $scope.formData.txtLongitude = parseFloat(gservice.clickLong).toFixed(3);
        });
    });

    // Take query parameters and incorporate into a JSON queryBody
    $scope.queryUsers = function() {

        // Assemble Query Body
        queryBody = {
            longitude: parseFloat($scope.formData.txtLongitude),
            latitude: parseFloat($scope.formData.txtLatitude),
            distance: parseFloat($scope.formData.txtRadius),
            category: $("#txtStoreCategory").val().trim()
        };

        // Post the queryBody to the /query POST route to retrieve the filtered results
        $http.post('/query', queryBody)

        // Store the filtered results in queryResults
        .success(function(queryResults) {

                // Pass the filtered results to the Google Map Service and refresh the map
                gservice.refresh(queryBody.latitude, queryBody.longitude, queryResults);

                // Count the number of records retrieved for the panel-footer
                $scope.queryCount = queryResults.length;

                // Clear formData
                $scope.formData.txtLongitude = "";
                $scope.formData.txtLatitude = "";
                $scope.formData.txtRadius = "";

            })
            .error(function(queryResults) {
                console.log('Error ' + queryResults);
            })
    };

    $scope.clearFilter = function() {

      // Clear map filters
      gservice.refresh(queryBody.latitude, queryBody.longitude, false);

    }

});

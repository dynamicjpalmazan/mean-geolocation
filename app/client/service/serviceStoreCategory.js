// Creates the serviceStoreCategory factory.
angular.module('serviceStoreCategory', [])
    .factory('serviceStoreCategory', function($rootScope, $http) {

        // Initialize Variables
        // -------------------------------------------------------------

        // Functions
        // --------------------------------------------------------------
        // Refresh the category table
        var refreshCategory = function() {

            // Perform an AJAX call to get all of the records in the db.
            $http.get('/categories')
                .success(function(response) {

                    return response;

                }).error(function() {

                });

        }; // end function refreshCategory

    }); // end serviceStoreCategory factory

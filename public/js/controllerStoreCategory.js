// Creates the controllerStoreCategory Module and Controller. Note that it depends on the 'geolocation' module and service.
var controllerStoreCategory = angular.module('controllerStoreCategory', ['datatables']);
controllerStoreCategory.controller('controllerStoreCategory', function($scope, $http) {

    // Initializes Variables
    // ----------------------------------------------------------------------------
    $scope.formData = {};

    // Functions
    // ----------------------------------------------------------------------------
    // Refresh the category table
    $scope.refreshCategory = function() {

        // Perform an AJAX call to get all of the records in the db.
        $http.get('/categories')
            .success(function(response) {

                $scope.categories = response;
                $scope.refresh();

            }).error(function() {

            });

    }; // end function refreshCategory


    // Creates a new category based on the form fields
    $scope.createCategory = function() {

        // Grabs all of the text box fields
        var categoryData = {
            categoryName: $scope.formData.txtCategoryName,
            categoryDesc: $scope.formData.txtCategoryDesc
        };

        // Saves the category data to the db
        $http.post('/categories', categoryData)
            .success(function(data) {

                // Once complete, clear the form (except location)
                $scope.formData.txtCategoryName = "";
                $scope.formData.txtCategoryDesc = "";
                $scope.refreshCategory();

                // Display success message
                new PNotify({
                    title: 'Success!',
                    text: 'You\'ve successfully added a new store category!',
                    type: 'success'
                });

            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

    };

    // Method calls upon controller initialization
    $scope.refreshCategory();

});

// Creates the controllerStoreCategory Module and Controller. Note that it depends on the 'geolocation' module and service.
var controllerStoreCategory = angular.module('controllerStoreCategory', ['datatables']);
controllerStoreCategory.controller('controllerStoreCategory', function($scope, $http, $interval) {

    // Initializes Variables
    // ----------------------------------------------------------------------------
    $scope.formData = {};

    // Functions
    // ----------------------------------------------------------------------------
    // Refresh table data every 10secs
    $interval(function() {
        $scope.refreshCategory();
    }, 10000);

    // Refresh the category table
    $scope.refreshCategory = function() {

        // Perform an AJAX call to get all of the records in the db.
        $http.get('/categories')
            .success(function(response) {

                $scope.categories = response;

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

                // Display success message
                new PNotify({
                    title: 'Success!',
                    text: 'You\'ve successfully added a new store category!',
                    type: 'success'
                });

            })
            .error(function(data) {

                // Display error message
                new PNotify({
                    title: 'Oops!',
                    text: 'Something went wrong during data insertion!',
                    type: 'error'
                });

                // Log error
                console.log('Error: ' + data);

            });

    }; // end function createCategory

    $scope.rowDataCategory = function(category) {

        $scope.formData.txtEditCategoryID = category._id;
        $scope.formData.txtEditCategoryName = category.categoryName;
        $scope.formData.txtEditCategoryDesc = category.categoryDesc;

    }; // end function editCategory

    // Method calls upon controller initialization
    $scope.refreshCategory();

});

// Creates the controllerStoreCategory Module and Controller.
var controllerStoreCategory = angular.module('controllerStoreCategory', ['datatables']);
controllerStoreCategory.controller('controllerStoreCategory', function($scope, $http, $interval) {

    // Variable declarations
    // ----------------------------------------------------------------------------
    $scope.formData = {};

    // Functions
    // ----------------------------------------------------------------------------
    // Read all active categories
    $scope.getActiveCategory = function() {

        // Perform an AJAX call to get all of the records in the db.
        $http.get('/active-categories')
            .success(function(response) {

                $scope.categories = response;

            }).error(function() {

            });

    }; // end function getActiveCategory

    // Read all archived categories
    $scope.getInactiveCategory = function() {

        // Perform an AJAX call to get all of the records in the db.
        $http.get('/inactive-categories')
            .success(function(response) {

                $scope.inactiveCategories = response;

            }).error(function() {

            });

    }; // end function getInactiveCategory

    // Create a new category
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


        $scope.getActiveCategory();

    }; // end function createCategory

    // Sets the row data as formData
    $scope.rowDataCategory = function(category) {

        $scope.formData.txtEditCategoryName = category.categoryName;
        $scope.formData.txtEditCategoryDesc = category.categoryDesc;
        $scope.formData.txtEditCategoryID = category._id;
        $scope.formData.txtDeleteCategoryID = category._id;
        $scope.formData.txtRestoreCategoryID = category._id;

    }; // end function editCategory

    // Update a category
    $scope.updateCategory = function() {

        // Grabs all of the text box fields
        var categoryData = {
            _id: $scope.formData.txtEditCategoryID,
            categoryName: $scope.formData.txtEditCategoryName,
            categoryDesc: $scope.formData.txtEditCategoryDesc
        };

        // Saves the category data to the db
        $http.post('/categoryup', categoryData)
            .success(function(data) {

                // Once complete, clear the form
                $scope.formData.txtEditCategoryID = "";
                $scope.formData.txtEditCategoryName = "";
                $scope.formData.txtEditCategoryDesc = "";

                // Display success message
                new PNotify({
                    title: 'Success!',
                    text: 'You\'ve successfully updated a store category!',
                    type: 'success'
                });

            })
            .error(function(data) {

                // Display error message
                new PNotify({
                    title: 'Oops!',
                    text: 'Something went wrong during data processing!',
                    type: 'error'
                });

                // Log error
                console.log('Error: ' + data);

            });

        $scope.getActiveCategory();

    }; // end function updateCategory

    // Delete a category
    $scope.deleteCategory = function() {

        // Grabs all of the text box fields
        var categoryData = {
            _id: $scope.formData.txtDeleteCategoryID
        };

        // Saves the category data to the db
        $http.post('/categoryde', categoryData)
            .success(function(data) {

                // Once complete, clear the form
                $scope.formData.txtDeleteCategoryID = "";

                // Display success message
                new PNotify({
                    title: 'Success!',
                    text: 'You\'ve successfully deleted a store category!',
                    type: 'success'
                });

            })
            .error(function(data) {

                // Display error message
                new PNotify({
                    title: 'Oops!',
                    text: 'Something went wrong during data processing!',
                    type: 'error'
                });

                // Log error
                console.log('Error: ' + data);

            });

        $scope.getActiveCategory();

    }; // end function deleteCategory

    // Restore a category
    $scope.restoreCategory = function() {

        // Grabs all of the text box fields
        var categoryData = {
            _id: $scope.formData.txtRestoreCategoryID
        };

        // Saves the category data to the db
        $http.post('/categoryre', categoryData)
            .success(function(data) {

                // Once complete, clear the form
                $scope.formData.txtRestoreCategoryID = "";

                // Display success message
                new PNotify({
                    title: 'Success!',
                    text: 'You\'ve successfully restored a store category!',
                    type: 'success'
                });

            })
            .error(function(data) {

                // Display error message
                new PNotify({
                    title: 'Oops!',
                    text: 'Something went wrong during data processing!',
                    type: 'error'
                });

                // Log error
                console.log('Error: ' + data);

            });

        $scope.getInactiveCategory();

    }; // end function restoreCategory

    // Interval-based Functions
    // ----------------------------------------------------------------------------
    // Refresh table data (active and inactive categories) every 10secs
    $interval(function() {

        $scope.getActiveCategory();
        $scope.getInactiveCategory();

    }, 10000);


    // initialization Functions
    // ----------------------------------------------------------------------------
    // Get active and inactive categories
    $scope.getActiveCategory();
    $scope.getInactiveCategory();

});

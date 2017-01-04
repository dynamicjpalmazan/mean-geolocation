// Creates the controllerUserDetail Module and Controller.
var controllerUserDetail = angular.module('controllerUserDetail', ['datatables']);
controllerUserDetail.controller('controllerUserDetail', function($scope, $http, $interval) {

    // Variable declarations
    // ----------------------------------------------------------------------------
    $scope.formData = {};

    // Functions
    // ----------------------------------------------------------------------------
    // Read all active users
    $scope.getActiveUser = function() {

        // Perform an AJAX call to get all of the records in the db.
        $http.get('/active-users')
            .success(function(response) {

                $scope.users = response;

            }).error(function() {

            });

    }; // end function getActiveUser

    // Read all archived users
    $scope.getInactiveUser = function() {

        // Perform an AJAX call to get all of the records in the db.
        $http.get('/inactive-users')
            .success(function(response) {

                $scope.inactiveUsers = response;

            }).error(function() {

            });

    }; // end function getInactiveUser

    // Create a new user
    $scope.createUser = function() {

        // Grabs all of the text box fields
        var userData = {
            userFirstName: $scope.formData.txtUserFirstName,
            userLastName: $scope.formData.txtUserLastName,
            userAlias: $scope.formData.txtUserAlias,
            userEmail: $scope.formData.txtUserEmail,
            userPassword: $scope.formData.txtUserPassword
        };

        // Saves the user data to the db
        $http.post('/users', userData)
            .success(function(data) {

                // Once complete, clear the form
                $scope.formData.txtUserFirstName = "";
                $scope.formData.txtUserLastName = "";
                $scope.formData.txtUserAlias = "";
                $scope.formData.txtUserEmail = "";
                $scope.formData.txtUserPassword = "";

                // Display success message
                new PNotify({
                    title: 'Success!',
                    text: 'You\'ve successfully added a new user!',
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


        $scope.getActiveUser();

    }; // end function createUser

    // Sets the row data as formData
    $scope.rowDataUser = function(user) {

        $scope.formData.txtEditUserFirstName = user.userFirstName;
        $scope.formData.txtEditUserLastName = user.userLastName;
        $scope.formData.txtEditUserAlias = user.userAlias;
        $scope.formData.txtEditUserEmail = user.userEmail;
        $scope.formData.txtEditUserPassword = user.userPassword;
        $scope.formData.txtEditUserID = user._id;
        $scope.formData.txtDeleteUserID = user._id;
        $scope.formData.txtRestoreUserID = user._id;

    }; // end function editUser

    // Update a user
    $scope.updateUser = function() {

        // Grabs all of the text box fields
        var userData = {
            _id: $scope.formData.txtEditUserID,
            userFirstName: $scope.formData.txtEditUserFirstName,
            userLastName: $scope.formData.txtEditUserLastName,
            userAlias: $scope.formData.txtEditUserAlias,
            userEmail: $scope.formData.txtEditUserEmail,
            userPassword: $scope.formData.txtEditUserPassword
        };

        // Saves the user data to the db
        $http.post('/userup', userData)
            .success(function(data) {

                // Once complete, clear the form
                $scope.formData.txtEditUserID = "";
                $scope.formData.txtEditUserFirstName = "";
                $scope.formData.txtEditUserLastName = "";
                $scope.formData.txtEditUserAlias = "";
                $scope.formData.txtEditUserEmail = "";
                $scope.formData.txtEditUserPassword = "";

                // Display success message
                new PNotify({
                    title: 'Success!',
                    text: 'You\'ve successfully updated a user!',
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

        $scope.getActiveUser();

    }; // end function updateUser

    // Delete a user
    $scope.deleteUser = function() {

        // Grabs all of the text box fields
        var userData = {
            _id: $scope.formData.txtDeleteUserID
        };

        // Saves the user data to the db
        $http.post('/userde', userData)
            .success(function(data) {

                // Once complete, clear the form
                $scope.formData.txtDeleteUserID = "";

                // Display success message
                new PNotify({
                    title: 'Success!',
                    text: 'You\'ve successfully deleted a user!',
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

        $scope.getActiveUser();

    }; // end function deleteUser

    // Restore a user
    $scope.restoreUser = function() {

        // Grabs all of the text box fields
        var userData = {
            _id: $scope.formData.txtRestoreUserID
        };

        // Saves the user data to the db
        $http.post('/userre', userData)
            .success(function(data) {

                // Once complete, clear the form
                $scope.formData.txtRestoreUserID = "";

                // Display success message
                new PNotify({
                    title: 'Success!',
                    text: 'You\'ve successfully restored a user!',
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

        $scope.getInactiveUser();

    }; // end function restoreUser

    // Interval-based Functions
    // ----------------------------------------------------------------------------
    // Refresh table data (active and inactive users) every 10secs
    $interval(function() {

        $scope.getActiveUser();
        $scope.getInactiveUser();

    }, 10000);


    // initialization Functions
    // ----------------------------------------------------------------------------
    // Get active and inactive users
    $scope.getActiveUser();
    $scope.getInactiveUser();

});

// Express User Controller
// Require -> user model
var mongoUserMdl = require('../model/modelUserDetail.js');

// Get all active users
exports.getActiveUser = function(req, res) {

    // Uses Mongoose schema to run the search (status : 1)
    var query = mongoUserMdl.find({
        status: 1
    });
    query.exec(function(err, users) {
        if (err)
            res.send(err);

        // If no errors are found, it responds with a JSON of all users
        res.json(users);
    });
};

// Get all inactive  users
exports.getInactiveUser = function(req, res) {

    // Uses Mongoose schema to run the search (status : 0)
    var query = mongoUserMdl.find({
        status: 0
    });
    query.exec(function(err, users) {
        if (err)
            res.send(err);

        // If no errors are found, it responds with a JSON of all users
        res.json(users);
    });
};

// Create a new user
exports.createNewUser = function(req, res) {

    // Creates a new User based on the Mongoose schema and the post body
    var newuser = new mongoUserMdl(req.body);

    // New User is saved in the db.
    newuser.save(function(err) {
        if (err)
            res.send(err);

        // If no errors are found, it responds with a JSON of the new user
        res.json(req.body);
    });
};

// Update an existing user
exports.updateUser = function(req, res) {

    var userID = req.body._id.replace(/\"/g, "");
    var userFirstName = req.body.userFirstName.replace(/\"/g, "");
    var userLastName = req.body.userLastName.replace(/\"/g, "");
    var userAlias = req.body.userAlias.replace(/\"/g, "");
    var userEmail = req.body.userEmail.replace(/\"/g, "");
    var userPassword = req.body.userPassword.replace(/\"/g, "");

    mongoUserMdl.findByIdAndUpdate(userID, {
        userFirstName: userFirstName,
        userLastName: userLastName,
        userAlias: userAlias,
        userEmail: userEmail,
        userPassword: userPassword

    }, function(err, user) {
        if (err) throw err;

        // we have the updated user returned to us
        res.json(req.body);
    });

};

// Deactivate an existing user
exports.deactivateUser = function(req, res) {

    var userID = req.body._id.replace(/\"/g, "");

    mongoUserMdl.findByIdAndUpdate(userID, {
        status: 0
    }, function(err, user) {
        if (err) throw err;

        // we have the updated user returned to us
        res.json(req.body);
    });

};

// Restore an inactive user
exports.restoreUser = function(req, res) {

    var userID = req.body._id.replace(/\"/g, "");

    mongoUserMdl.findByIdAndUpdate(userID, {
        status: 1
    }, function(err, user) {
        if (err) throw err;

        // we have the restored user returned to us
        res.json(req.body);
    });

};

// Dependencies
var mongoose = require('mongoose');
// StoreDetail Model
var Store = require('./model/modelStoreDetail.js');
// StoreCategory Model
var Category = require('./model/modelStoreCategory.js');

// Opens App Routes
module.exports = function(app) {

    // --------------------------------------------------------
    // STORE DETAIL ROUTES
    // --------------------------------------------------------

    // GET Routes
    // --------------------------------------------------------
    // Retrieve records for all stores in the db
    app.get('/stores', function(req, res) {

        // Uses Mongoose schema to run the search (empty conditions)
        var query = Store.find({
            status: 1
        });
        query.exec(function(err, stores) {
            if (err)
                res.send(err);

            // If no errors are found, it responds with a JSON of all stores
            res.json(stores);
        });
    });

    // Retrieve records for all inactive stores in the db
    app.get('/inactive-stores', function(req, res) {

        // Uses Mongoose schema to run the search (empty conditions)
        var query = Store.find({
            status: 0
        });
        query.exec(function(err, stores) {
            if (err)
                res.send(err);

            // If no errors are found, it responds with a JSON of all stores
            res.json(stores);
        });
    });

    // POST Routes
    // --------------------------------------------------------
    // Provides method for saving new stores in the db
    app.post('/stores', function(req, res) {

        // Creates a new Store based on the Mongoose schema and the post body
        var newstore = new Store(req.body);

        // New Store is saved in the db.
        newstore.save(function(err) {
            if (err)
                res.send(err);

            // If no errors are found, it responds with a JSON of the new store
            res.json(req.body);
        });
    });

    // --------------------------------------------------------
    // STORE CATEGORY ROUTES
    // --------------------------------------------------------

    // GET Routes
    // --------------------------------------------------------
    // Get all active categories
    app.get('/active-categories', function(req, res) {

        // Uses Mongoose schema to run the search (empty conditions)
        var query = Category.find({
            status: 1
        });
        query.exec(function(err, categories) {
            if (err)
                res.send(err);

            // If no errors are found, it responds with a JSON of all categories
            res.json(categories);
        });
    });

    // Get all inactive  categories
    app.get('/inactive-categories', function(req, res) {

        // Uses Mongoose schema to run the search (empty conditions)
        var query = Category.find({
            status: 0
        });
        query.exec(function(err, categories) {
            if (err)
                res.send(err);

            // If no errors are found, it responds with a JSON of all categories
            res.json(categories);
        });
    });

    // POST Routes
    // --------------------------------------------------------
    // Provides method for saving new categories in the db
    app.post('/categories', function(req, res) {

        // Creates a new Category based on the Mongoose schema and the post body
        var newcategory = new Category(req.body);

        // New Category is saved in the db.
        newcategory.save(function(err) {
            if (err)
                res.send(err);

            // If no errors are found, it responds with a JSON of the new category
            res.json(req.body);
        });
    });

    // Provides method for updating categories in the db
    app.post('/categoryup', function(req, res) {

        var categID = req.body._id.replace(/\"/g, "");
        var categName = req.body.categoryName.replace(/\"/g, "");
        var categDesc = req.body.categoryDesc.replace(/\"/g, "");

        Category.findByIdAndUpdate(categID, {
            categoryName: categName,
            categoryDesc: categDesc
        }, function(err, category) {
            if (err) throw err;

            // we have the updated user returned to us
            res.json(req.body);
        });

    });

    // Provides method for deactivating categories in the db
    app.post('/categoryde', function(req, res) {

        var categID = req.body._id.replace(/\"/g, "");

        Category.findByIdAndUpdate(categID, {
            status: 0
        }, function(err, category) {
            if (err) throw err;

            // we have the updated category returned to us
            res.json(req.body);
        });

    });

    // Provides method for restoring categories in the db
    app.post('/categoryre', function(req, res) {

        var categID = req.body._id.replace(/\"/g, "");

        Category.findByIdAndUpdate(categID, {
            status: 1
        }, function(err, category) {
            if (err) throw err;

            // we have the restored category returned to us
            res.json(req.body);
        });

    });

};

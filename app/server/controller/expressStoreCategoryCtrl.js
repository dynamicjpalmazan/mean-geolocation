// Express Store Category Controller
// Require -> store category model
var mongoStoreCategoryMdl = require('../model/modelStoreCategory.js');

// Get all active categories
exports.getActiveStoreCategory = function(req, res) {

    // Uses Mongoose schema to run the search (status : 1)
    var query = mongoStoreCategoryMdl.find({
        status: 1
    });
    query.exec(function(err, categories) {
        if (err)
            res.send(err);

        // If no errors are found, it responds with a JSON of all categories
        res.json(categories);
    });
};

// Get all inactive  categories
exports.getInactiveStoreCategory = function(req, res) {

    // Uses Mongoose schema to run the search (status : 0)
    var query = mongoStoreCategoryMdl.find({
        status: 0
    });
    query.exec(function(err, categories) {
        if (err)
            res.send(err);

        // If no errors are found, it responds with a JSON of all categories
        res.json(categories);
    });
};

// Create a new category
exports.createNewCategory = function(req, res) {

    // Creates a new Category based on the Mongoose schema and the post body
    var newcategory = new mongoStoreCategoryMdl(req.body);

    // New Category is saved in the db.
    newcategory.save(function(err) {
        if (err)
            res.send(err);

        // If no errors are found, it responds with a JSON of the new category
        res.json(req.body);
    });
};

// Update an existing category
exports.updateCategory = function(req, res) {

    var categID = req.body._id.replace(/\"/g, "");
    var categName = req.body.categoryName.replace(/\"/g, "");
    var categDesc = req.body.categoryDesc.replace(/\"/g, "");

    mongoStoreCategoryMdl.findByIdAndUpdate(categID, {
        categoryName: categName,
        categoryDesc: categDesc
    }, function(err, category) {
        if (err) throw err;

        // we have the updated user returned to us
        res.json(req.body);
    });

};

// Deactivate an existing category
exports.deactivateCategory = function(req, res) {

    var categID = req.body._id.replace(/\"/g, "");

    mongoStoreCategoryMdl.findByIdAndUpdate(categID, {
        status: 0
    }, function(err, category) {
        if (err) throw err;

        // we have the updated category returned to us
        res.json(req.body);
    });

};

// Restore an inactive category
exports.restoreCategory = function(req, res) {

    var categID = req.body._id.replace(/\"/g, "");

    mongoStoreCategoryMdl.findByIdAndUpdate(categID, {
        status: 1
    }, function(err, category) {
        if (err) throw err;

        // we have the restored category returned to us
        res.json(req.body);
    });

};

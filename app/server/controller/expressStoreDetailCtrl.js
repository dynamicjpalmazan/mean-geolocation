// Express Store Detail Controller
// Require -> store detail model
var mongoStoreDetailMdl = require('../model/modelStoreDetail.js');

// Get all active stores
exports.getActiveStore = function(req, res) {

    // Uses Mongoose schema to run the search (status : 1)
    var query = mongoStoreDetailMdl.find({
        status: 1
    });
    query.exec(function(err, stores) {
        if (err)
            res.send(err);

        // If no errors are found, it responds with a JSON of all stores
        res.json(stores);
    });
};

// Get all inactive stores
exports.getInactiveStore = function(req, res) {

    // Uses Mongoose schema to run the search (status : 0)
    var query = mongoStoreDetailMdl.find({
        status: 0
    });

    query.exec(function(err, stores) {
        if (err)
            res.send(err);

        // If no errors are found, it responds with a JSON of all stores
        res.json(stores);
    });
};

// Create a new store
exports.createNewStore = function(req, res) {

    // Creates a new Store based on the Mongoose schema and the post body
    var newstore = new mongoStoreDetailMdl(req.body);

    // New Store is saved in the db.
    newstore.save(function(err) {
        if (err)
            res.send(err);

        // If no errors are found, it responds with a JSON of the new store
        res.json(req.body);
    });
};

// Update an existing store
exports.updateStore = function(req, res) {

    var storeID = req.body._id.replace(/\"/g, "");
    var storeName = req.body.storeName.replace(/\"/g, "");
    var storeAddress = req.body.storeAddress.replace(/\"/g, "");
    var storeCategory = req.body.storeCategory.replace(/\"/g, "");

    mongoStoreDetailMdl.findByIdAndUpdate(storeID, {
        storeName: storeName,
        storeAddress: storeAddress,
        storeCategory: storeCategory
    }, function(err, store) {
        if (err) throw err;

        // we have the updated store returned to us
        res.json(req.body);
    });

};

// Deactivate an existing store
exports.deactivateStore = function(req, res) {

    var storeID = req.body._id.replace(/\"/g, "");

    mongoStoreDetailMdl.findByIdAndUpdate(storeID, {
        status: 0
    }, function(err, store) {
        if (err) throw err;

        // we have the updated store returned to us
        res.json(req.body);
    });

};

// Restore an inactive store
exports.restoreStore = function(req, res) {

    var storeID = req.body._id.replace(/\"/g, "");

    mongoStoreDetailMdl.findByIdAndUpdate(storeID, {
        status: 1
    }, function(err, store) {
        if (err) throw err;

        // we have the restored store returned to us
        res.json(req.body);
    });

};

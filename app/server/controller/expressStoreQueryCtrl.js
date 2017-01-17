// Express Store Query Controller
// Require -> store detail model
var mongoStoreDetailMdl = require('../model/modelStoreDetail.js');

// Get all nearby stores
exports.findNearbyStores = function(req, res) {

    // Grab all of the query parameters from the body.
    var lat = req.body.latitude;
    var long = req.body.longitude;
    var distance = req.body.distance;
    var category = req.body.category.trim();
    var name = req.body.name.trim();
    var regexp = new RegExp("^"+ name);

    // Opens a generic Mongoose Query. Depending on the post body we will...
    var query = mongoStoreDetailMdl.find({
        status: 1
    });

    // ...include filter by Max Distance (converting miles to meters)
    if (distance) {

        // Using MongoDB's geospatial querying features. (Note how coordinates are set [long, lat]
        query = query.where('storeLocation').near({
            center: {
                type: 'Point',
                coordinates: [long, lat]
            },

            // Converting meters to miles. Specifying spherical geometry (for globe)
            maxDistance: distance * 1609.34,
            spherical: true
        });
    }

    // ... Other queries will go here ...
    if (category) {
        query = query.where('storeCategory').equals(category);
    }

    if (name) {
        query = query.where('storeName').equals(regexp);
    }

    // Execute Query and Return the Query Results
    query.exec(function(err, stores) {
        if (err)
            res.send(err);

        // If no errors, respond with a JSON of all stores that meet the criteria
        res.json(stores);
    });
};

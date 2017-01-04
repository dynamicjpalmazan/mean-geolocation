// Dependencies
var mongoose = require('mongoose');

// Opens App Routes
module.exports = function(app) {

    // Require store category route file
    require('./routeStoreCategory')(app);

    // Require store detail route file
    require('./routeStoreDetail')(app);

    // Require store query route file
    require('./routeStoreQuery')(app);

    // Require user detail route file
    require('./routeUserDetail')(app);

};

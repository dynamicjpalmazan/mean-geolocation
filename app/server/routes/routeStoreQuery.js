// require -> store query controller
var expressStoreQueryCtrl = require('../controller/expressStoreQueryCtrl');

// store query routes
module.exports = function(app) {

  // POST Routes
  // --------------------------------------------------------
  // Find all stores near the indicated coordinates
  app.post('/query', expressStoreQueryCtrl.findNearbyStores);

};

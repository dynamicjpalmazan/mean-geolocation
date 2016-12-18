// require -> store detail controller
var expressStoreDetailCtrl = require('../controller/expressStoreDetailCtrl');

// store detail routes
module.exports = function(app) {

  // GET Routes
  // --------------------------------------------------------
  // Get all stores
  app.get('/active-stores', expressStoreDetailCtrl.getActiveStore);
  // Get all inactive stores
  app.get('/inactive-stores', expressStoreDetailCtrl.getInactiveStore);



  // POST Routes
  // --------------------------------------------------------
  // Create a new store
  app.post('/stores', expressStoreDetailCtrl.createNewStore);
  // Update an existing store
  app.post('/storeup', expressStoreDetailCtrl.updateStore);
  // Deactivate an existing store
  app.post('/storede', expressStoreDetailCtrl.deactivateStore);
  // Restore an inactive category
  app.post('/storere', expressStoreDetailCtrl.restoreStore);


};

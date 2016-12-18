// require -> store category controller
var expressStoreCategoryCtrl = require('../controller/expressStoreCategoryCtrl');

// store category routes
module.exports = function(app) {

  // GET Routes
  // --------------------------------------------------------
  // Get all active categories
  app.get('/active-categories', expressStoreCategoryCtrl.getActiveStoreCategory);
  // Get all inactive  categories
  app.get('/inactive-categories', expressStoreCategoryCtrl.getInactiveStoreCategory);



  // POST Routes
  // --------------------------------------------------------
  // Create a new category
  app.post('/categories', expressStoreCategoryCtrl.createNewCategory);
  // Update an existing category
  app.post('/categoryup', expressStoreCategoryCtrl.updateCategory);
  // Deactivate an existing category
  app.post('/categoryde', expressStoreCategoryCtrl.deactivateCategory);
  // Restore an inactive category
  app.post('/categoryre', expressStoreCategoryCtrl.restoreCategory);

};

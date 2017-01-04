// require -> user controller
var expressUserCtrl = require('../controller/expressUserDetailCtrl');

// store user routes
module.exports = function(app) {

  // GET Routes
  // --------------------------------------------------------
  // Get all active users
  app.get('/active-users', expressUserCtrl.getActiveUser);
  // Get all inactive users
  app.get('/inactive-users', expressUserCtrl.getInactiveUser);



  // POST Routes
  // --------------------------------------------------------
  // Create a new user
  app.post('/users', expressUserCtrl.createNewUser);
  // Update an existing user
  app.post('/userup', expressUserCtrl.updateUser);
  // Deactivate an existing user
  app.post('/userde', expressUserCtrl.deactivateUser);
  // Restore an inactive user
  app.post('/userre', expressUserCtrl.restoreUser);

};

const noteRoutes = require('./note_routes');
const loginRoutes = require('./login');
module.exports = function(app, db,sess) {
  noteRoutes(app, db, sess);
  loginRoutes(app, db, sess);
  // Other route groups could go here, in the future
};
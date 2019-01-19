const category = require('./category');
const planRoutes = require('./plan');
const gymdetails = require('./gymdetails');
module.exports = function (app, db, mongojs, sess) {
  planRoutes(app, db, mongojs, sess);
  gymdetails(app, db, mongojs, sess);
  category(app, db, mongojs, sess);
  // Other route groups could go here, in the future

};
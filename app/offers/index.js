const partnerRoutes = require('./offers');
const myroot = require('./myoffers');
module.exports = function(app, db, sess, mongojs) {
    partnerRoutes(app, db, sess, mongojs);
  
  // Other route groups could go here, in the future
};
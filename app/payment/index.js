const paypalRoutes = require('./paypal');
module.exports = function(app, paypal, sess) {
    paypalRoutes(app, paypal,sess);
  // Other route groups could go here, in the future
};
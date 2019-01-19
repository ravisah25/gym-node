const resetRoutes = require('./resetpassword');
module.exports = function(app, nodemailer, sess) {
    resetRoutes(app, nodemailer, sess);
  // Other route groups could go here, in the future
};
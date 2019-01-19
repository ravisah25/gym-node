
const picRoutes = require('./picupload');
module.exports = function(app, fs, base64ToImage, db,sess, mongojs) {
    picRoutes(app, fs, base64ToImage, db,sess, mongojs);
  // Other route groups could go here, in the future
};
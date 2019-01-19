module.exports = function (app, fs, base64ToImage, db, sess, mongojs) {
  var array1 = [];
  var fs = require('fs');
  app.post('/postPhotos', function (req, res) {
    var images = [];
    var ownerid = req.body.ownerid;
    db.gymdetails.find({ ownerid: ownerid }, function (err, docs) {
      images = docs[0].img;
      if (images.length == 5 || images.length + req.body.selectImageData.length > 5) {
        res.json("Images exceeded");
      }
      else {
        for (var i = 0; i < req.body.selectImageData.length; i++) {
          var base64String = req.body.selectImageData[i];
          var path = __dirname + "/";
          var timeStamp = Date.now();
          var optionalObj = { 'fileName': ownerid + timeStamp, 'type': 'png' };
          var imageInfo = base64ToImage(base64String, path, optionalObj);
          array1[i] = "server/app/photo/" + ownerid + timeStamp + ".png";
          console.log(array1[i]);
        }
        db.gymdetails.findAndModify({
          query: { ownerid: ownerid },
          update: { $push: { img: { $each: array1 } } },
          new: true
        }, function (err, doc) {
          res.json(doc);
        })
      }
    })
  })

  app.delete('/delPhotos/:data', function (req, res) {
    var ownerid = req.query.ownerid;
    var delImage = req.query.image;
    db.gymdetails.update({ ownerid: ownerid },
      {
        $pull:
          { "img": delImage }
      }, function (err, docs) {
        if (err)
          res.send(err);
        else {
          res.send(docs);
          var delArray = delImage.split("/");
          var filePath = __dirname + "/" + delArray[delArray.length - 1];
          fs.unlinkSync(filePath);
        }
      })
  });
}   
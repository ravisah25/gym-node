

module.exports = function (app, db, sess) {
  app.post('/register', function (req, res) {

    db.register.findOne({ email: req.body.email }, function (err, docs) {

      if (docs == null) {
        db.register.insert(req.body, function (err, docs) {
          sess = req.session;
          sess.email = "ravi";
          res.json(docs);
        })
      }
      else {
        if (req.body.provider == 'facebook') {
          sess = req.session;
          sess.email = "ravi";
          res.json(docs);
        }
        else {
          res.json("Already exists")
        }
      }

    })


  });

  app.get('/register/:email', function (req, res) {

    // sess = req.session;
    // if (sess.email) {
      var email = req.params.email;
      db.register.findOne({ email: email }, { password: 0 }, function (err, docs) {
        res.json(docs);
      })
    // }
    // else {
    //   res.json("Session out");
    // }

  });

  app.post('/persondetails', function (req, res) {


    // sess = req.session;
    // if (sess.email) {
      var email = req.body.email;
      db.register.findAndModify({
        query: { email: email },
        update: {
          $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            gender: req.body.gender,
            mobile: req.body.mobile,
          }
        },
        new: true
      }, function (err, doc) {
        res.json(doc);
      })
    // }
    // else {
    //   res.json("Session out");
    // }
  });

  app.post('/accountDetail', function (req, res) {

    // sess = req.session;
    // if (sess.email) {
      var email = req.body.email;
      db.register.findAndModify({
        query: { email: email },
        update: {
          $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            gender: req.body.gender,
            mobile: req.body.mobile,
          }
        },
        new: true
      }, function (err, doc) {
        res.json(doc);
      })
    // }
    // else {
    //   res.json("Session out");
    // }
  });
  ////////////////////
  app.post('/addressDetail', function (req, res) {

    // sess = req.session;
    // if (sess.email) {
      var email = req.body.email;
      db.register.findAndModify({
        query: { email: email },
        update: {
          $set: {
            addresLine1: req.body.addresLine1,
            addresLine2: req.body.addresLine2,
            town: req.body.town,
            country: req.body.country,
            postCode: req.body.postCode
          }
        },
        new: true
      }, function (err, doc) {
        res.json(doc);
      })
    // }
    // else {
    //   res.json("Session out");
    // }

  });
  ////////////////////////////
  app.post('/emergencyDetail', function (req, res) {

    // sess = req.session;
    // if (sess.email) {
      var email = req.body.email;
      db.register.findAndModify({
        query: { email: email },
        update: {
          $set: {
            phonenumber: req.body.phonenumber,
            name: req.body.name
          }
        },
        new: true
      }, function (err, doc) {
        res.json(doc);
      })
    // }
    // else {
    //   res.json("Session out");
    // }


  });
  ///////////////////////////////
  app.post('/postcodeDetail', function (req, res) {


    // sess = req.session;
    // if (sess.email) {
      var email = req.body.email;
      db.register.findAndModify({
        query: { email: email },
        update: {
          $set: {
            homepostcode: req.body.homepostcode,
            workpostcode: req.body.workpostcode
          }
        },
        new: true
      }, function (err, doc) {
        res.json(doc);
      })
    // }
    // else {
    //   res.json("Session out");
    // }


  });

  app.post('/passwordchange', function (req, res) {


    // sess = req.session;
    // if (sess.email) {

      db.register.findOne({ password: req.body.password }, function (err, docs) {

        if (docs == null) {
          res.json("wrong password")
        }
        else {
          db.register.findAndModify({
            query: { email: req.body.email },
            update: {
              $set: {
                password: req.body.confirmpassword,
              }
            },
            new: true
          }, function (err, doc) {
            res.json(doc);
          })
        }

      })
    // }
    // else {
    //   res.json("Session out");
    // }


  });
};

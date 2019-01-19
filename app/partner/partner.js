module.exports = function (app, db, sess, mongojs) {

    app.post('/partnerdetails', function (req, res) {


        // sess = req.session;
        // if (sess.email) {
        db.partner.findOne({ email: req.body.email }, function (err, docs) {
            if (docs == null) {
                db.partner.insert(req.body, function (err, docs) {
                    res.json(docs);
                })
            }
            else {
                res.json("Already exists")
            }
        });
        // }
        // else {
        //     res.json("Session out");
        // }
    })


    app.get('/partnerdetails', function (req, res) {

        // sess = req.session;
        // if (sess.email) {

        db.partner.find(function (err, docs) {
            res.json(docs);
        });
        // }
        // else {
        //     res.json("Session out");
        // }


    })

    app.post('/partnerlogin', function (req, res) {
        db.partner.findOne({ email: req.body.email }, function (err, user) {
            if (!user) {
                res.json("error");
            } else if (user.password != req.body.password) {
                res.json("error");
            } else {
                sess = req.session;
                sess.email = "ravi";
                res.json(user);
            }
        })
    });



    app.put('/partnerdetails', function (req, res) {
        // sess = req.session;
        // if (sess.email) {
        db.partner.findAndModify({
            query: { _id: mongojs.ObjectId(req.body._id) },
            update: {
                $set: {
                    name: req.body.name,
                    gymname: req.body.gymname,
                    email: req.body.email,
                    phoneno: req.body.phoneno,
                    address: req.body.address,
                    gymurl: req.body.gymurl,
                    gymtype: req.body.gymtype,
                    statustype: req.body.statustype,
                    password: req.body.password
                }
            },
            new: true
        }, function (err, doc) {
            res.json(doc);
        })
        // }
        // else {
        //     res.json("Session out");
        // }
    });

    app.put('/ownerdetails', function (req, res) {
        // sess = req.session;
        // if (sess.email) {
        if (req.body.dbName == "partner") {
            db.partner.findAndModify({
                query: { _id: mongojs.ObjectId(req.body.id) },
                update: {
                    $set: {
                        gymname: req.body.gymname,
                        address: req.body.address
                    }
                },
                new: true
            }, function (err, doc) {
                res.json(doc);
            })
        }
        else {
            db.gymdetails.findAndModify({
                query: { ownerid: req.body.id },
                update: {
                    $set: {
                        gymname: req.body.gymname,
                        location: req.body.location,
                        lat:req.body.lat,
                        lng:req.body.lng
                    }
                },
                new: true
            }, function (err, doc) {
                res.json(doc);
            })
        }
        // }
        // else {
        //     res.json("Session out");
        // }
    });

    app.delete('/partnerdetails/:id', function (req, res) {
        // sess = req.session;
        // if (sess.email) {
        var id = req.params.id;
        db.partner.remove({ _id: mongojs.ObjectId(id) }, function (err, docs) {
            if (err)
                res.json(err);
            res.json(docs);
        });
        // }
        // else {
        //     res.json("Session out");
        // }
    });


}  
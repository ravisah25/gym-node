module.exports = function (app, db, mongojs, sess) {
    app.post('/categories', function (req, res) {

        // sess = req.session;
        // if (sess.email) {
            db.categories.insert(req.body, function (err, docs) {
                res.json(docs);
            });
        // }
        // else {
        //     res.json("Session out");
        // }


    });
    app.get('/categories', function (req, res) {
        sess = req.session;
        db.categories.find(function (err, docs) {
            res.json(docs);
        });
    });

    app.put('/categories', function (req, res) {

        // sess = req.session;
        // if (sess.email) {
            db.categories.findAndModify({
                query: { _id: mongojs.ObjectId(req.body._id) },
                update: {
                    $set: {
                        category: req.body.category
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

    app.delete('/categories/:id', function (req, res) {

        // sess = req.session;
        // if (sess.email) {
            var id = req.params.id;
            db.categories.remove({ _id: mongojs.ObjectId(id) }, function (err, docs) {
                if (err)
                    res.json(err);
                res.json(docs);
            })
        // }
        // else {
        //     res.json("Session out");
        // }
    });



    app.post('/amenities', function (req, res) {

        // sess = req.session;
        // if (sess.email) {

            db.amenities.insert(req.body, function (err, docs) {
                res.json(docs);
            });
        // }
        // else {
        //     res.json("Session out");
        // }

    });
    app.get('/amenities', function (req, res) {
        db.amenities.find(function (err, docs) {
            res.json(docs);
        });
    });

    app.put('/amenities', function (req, res) {

        // sess = req.session;
        // if (sess.email) {
            db.amenities.findAndModify({
                query: { _id: mongojs.ObjectId(req.body._id) },
                update: {
                    $set: {
                        aminities: req.body.aminities
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

    app.delete('/amenities/:id', function (req, res) {
        var id = req.params.id;
        // sess = req.session;
        // if (sess.email) {
            db.amenities.remove({ _id: mongojs.ObjectId(id) }, function (err, docs) {
                if (err)
                    res.json(err);
                res.json(docs);
            })
        // }
        // else {
        //     res.json("Session out");
        // }

    });


    app.post('/facilities', function (req, res) {

        // sess = req.session;
        // if (sess.email) {

            db.facilities.insert(req.body, function (err, docs) {
                res.json(docs);
            });
        // }
        // else {
        //     res.json("Session out");
        // }


    });
    app.get('/facilities', function (req, res) {
        db.facilities.find(function (err, docs) {
            res.json(docs);
        });
    });

    app.put('/facilities', function (req, res) {

        // sess = req.session;
        // if (sess.email) {
            db.facilities.findAndModify({
                query: { _id: mongojs.ObjectId(req.body._id) },
                update: {
                    $set: {
                        facilities: req.body.facilities
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

    app.delete('/facilities/:id', function (req, res) {
        var id = req.params.id;

        // sess = req.session;
        // if (sess.email) {

            db.facilities.remove({ _id: mongojs.ObjectId(id) }, function (err, docs) {
                if (err)
                    res.json(err);
                res.json(docs);
            })
        // }
        // else {
        //     res.json("Session out");
        // }

    });


}


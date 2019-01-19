module.exports = function (app, db, mongojs, sess) {
    app.put('/offers', function (req, res) {

        // sess = req.session;
        // if (sess.email) {
            // db.offers.insert(req.body, function (err, docs) {
            //     res.json(docs);
            // });
            db.offers.findAndModify({
                query: { _id: mongojs.ObjectId(req.body.id) },
                update: {
                    $set: {
                        planid: req.body.planid,
                        selectOffer: req.body.selectOffer,
                        offername: req.body.offername
                    }
                }
            }, function (err, doc) {
                res.json(doc);
            })
        // }
        // else {
        //     res.json("Session out");
        // }
    });

    app.get('/offers', function (req, res) {

        var id = req.query.ownerid;
        db.plans.find({ ownerid: id }).toArray(function (err, docs) {
            res.json(docs);
        });
    });
    app.get('/myoffers', function (req, res) {
        // sess = req.session;
        // if (sess.email) {

            // var id = req.query.ownerid;
            // db.offers.find({ ownerid: id }, { planid: 1, selectOffer: 1, gymid: 1, ownerid: 1, offername: 1 }).toArray(function (err, docs) {
            //     res.json(docs);
            // });
            db.offers.find(function (err, docs) {
                res.json(docs);
            });
        // }
        // else {
        //     res.json("Session out");
        // }
    });

    app.delete('/offers/:id', function (req, res) {
        // sess = req.session;
        // if (sess.email) {
            var id = req.params.id;
            db.offers.remove({ _id: mongojs.ObjectId(id) }, function (err, docs) {
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
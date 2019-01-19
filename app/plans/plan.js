module.exports = function (app, db, mongojs, sess) {
    app.post('/plan', function (req, res) {

        // sess = req.session;
        // if (sess.email) {
            db.plans.insert(req.body, function (err, docs) {
                res.json(docs);
            });
        // }
        // else {
        //     res.json("Session out");
        // }
    });


    app.get('/plan', function (req, res) {
        db.plans.find(function (err, docs) {
            res.json(docs);
        });
    });



    app.put('/plan', function (req, res) {
        // sess = req.session;
        // if (sess.email) {
            db.plans.findAndModify({
                query: { ownerid: req.body.ownerid },
                update: {
                    $set: {
                        perVisit: req.body.perVisit,
                        monthPass: req.body.monthPass                       
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




    app.delete('/plan/:id', function (req, res) {

        // sess = req.session;
        // if (sess.email) {
            var id = req.params.id;
            db.plans.remove({ _id: mongojs.ObjectId(id) }, function (err, docs) {
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
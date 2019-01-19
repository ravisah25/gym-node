module.exports = function (app, db, sess, mongojs) {
    app.post('/banking', function (req, res) {

        sess = req.session;
        // if (sess.email) {
            db.banking.insert(req.body, function (err, docs) {
                res.json(docs);
            })
        // }
        // else {
        //     res.json("Session out");
        // }


    });

    app.get('/banking', function (req, res) {

        var id = req.query.ownerid;
        db.banking.find({ ownerid: id }, { bankname: 1, cardnumber: 1, otherdetails: 1, ownerid: 1, status: 1 }).toArray(function (err, docs) {
            res.json(docs);
        });
    });


    app.delete('/banking/:id', function (req, res) {
        sess = req.session;
        var id = req.params.id;
        db.banking.remove({ _id: mongojs.ObjectId(id) }, function (err, docs) {
            if (err)
                res.json(err);
            res.json(docs);
        })
    });


    app.put('/banking', function (req, res) {
        // sess = req.session;
        // if (sess.email) {
            db.banking.findAndModify({
                query: { _id: mongojs.ObjectId(req.body._id) },
                update: {
                    $set: {
                        bankname: req.body.bankname,
                        cardnumber: req.body.cardnumber,
                        otherdetails: req.body.otherdetails,
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
}
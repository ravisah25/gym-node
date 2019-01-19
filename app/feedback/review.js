module.exports = function (app, db, mongojs, sess) {
    app.post("/review", function (req, res) {

        // sess = req.session;
        // if (sess.email) {
        db.review.insert(req.body, function (err, docs) {
            res.json(docs);
        })
        // }
        // else {
        //     res.json("Session out");
        // }
    })

    app.put("/review", function (req, res) {
        db.gymdetails.findAndModify({
            query: { _id: mongojs.ObjectId(req.body.id) },
            update: {
                $set: {
                    rating: req.body.rating
                }
            }
        }, function (err, doc) {
            res.json(doc);
        })
    })


    app.get("/review", function (req, res) {
        db.review.find(function (err, docs) {
            res.json(docs);
        })
    })
    app.get('/getgymreview', function (req, res) {

        var id = req.query.id;
        db.review.find({ gymid: id }, { _id: 1, email: 1, gymid: 1, todaydate: 1, comment: 1, rating: 1 }).toArray(function (err, docs) {
            res.json(docs);
        });
    });

    app.post("/newsletter", function (req, res) {
        db.newsletter.findOne({ email: req.body.email }, function (err, docs) {
            if (docs == null) {
                db.newsletter.insert(req.body, function (err, docs) {
                    res.json(docs);
                })
            }
            else {
                res.json("Already exists")
            }
        })
    })
}
module.exports = function (app, db, sess) {

    app.post('/login', function (req, res) {
        db.register.findOne({ email: req.body.email }, function (err, user) {
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

    app.get('/login/:email', function (req, res) {
        db.register.findOne({ email: req.params.email }, function (err, user) {
            if (!user) {
                res.json("error");
            } else {
                res.json(user);
            }
        })
    });
};
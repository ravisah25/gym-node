module.exports = function (app, db, mongojs, sess) {
    app.post('/gymdetails', function (req, res) {

        // sess = req.session;
        // if (sess.email) {
        db.gymdetails.insert(req.body, function (err, docs) {
            res.json(docs);
        })
        // }
        // else {
        //     res.json("Session out");
        // }


    });

    app.get('/gymdetails', function (req, res) {
        db.gymdetails.find(function (err, docs) {
            res.json(docs);
        })
    });
    app.get('/gymdetails/:ownerid', function (req, res) {

        var id = req.params.ownerid;
        // db.gymdetails.find({ ownerid: id }, function (err, docs) {
        //     res.json(docs);
        // });

        db.gymdetails.aggregate(
            {
                $match:{ownerid: id}
            },
            {
              $lookup: {
                from: "plans",
                localField: "ownerid",
                foreignField: "ownerid",
                as: "plans"
              }
            },
            function (err, docs) {
              if (err) {
                res.json(err);
              }
              res.json(docs);
            }
          )
    });



    app.put('/gymdetails', function (req, res) {
        // sess = req.session;
        // if (sess.email) {
        db.gymdetails.findAndModify({
            query: { _id: mongojs.ObjectId(req.body._id) },
            update: {
                $set: {
                    gymname: req.body.gymname,
                    location: req.body.location,
                    description: req.body.description,
                    categoryname: req.body.categoryname,
                    selectedAminityList: req.body.selectedAminityList,
                    selectedFacilityList: req.body.selectedFacilityList,
                    postcode: req.body.postcode,
                    monStartTime: req.body.monStartTime,
                    monEndTime: req.body.monEndTime,
                    tueStartTime: req.body.tueStartTime,
                    tueEndTime: req.body.tueEndTime,
                    wedStartTime: req.body.wedStartTime,
                    wedEndTime: req.body.wedEndTime,
                    thuStartTime: req.body.thuStartTime,
                    thuEndTime: req.body.thuEndTime,
                    friStartTime: req.body.friStartTime,
                    friEndTime: req.body.friEndTime,
                    satStartTime: req.body.satStartTime,
                    satEndTime: req.body.satEndTime,
                    sunStartTime: req.body.sunStartTime,
                    sunEndTime: req.body.sunEndTime,
                    lat:req.body.lat,
                    lng:req.body.lng
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



    app.delete('/gymdetails/:ownerid', function (req, res) {
        // sess = req.session;
        // if (sess.email) {
        var id = req.params.ownerid;
        db.gymdetails.remove({ ownerid: id }, function (err, docs) {
            if (err)
                res.json(err);
            res.json(docs);
        })
        // }
        // else {
        //     res.json("Session out");
        // }
    });







    ///////////////////GymDetailsForProduct////////////////
    app.get('/gymdetail/:id', function (req, res) {
        // var id = req.params.id;
        // db.gymdetails.findOne({ _id: mongojs.ObjectId(id) }, function (err, docs) {
        //     console.log(docs);
        //     res.json(docs);
        // })


        var id = req.params.id;
        db.gymdetails.aggregate([
            { "$addFields": { "gymid": { "$toString": "$_id" } } },
            {
                "$lookup": {
                    "from": "plans",
                    "localField": "gymid",
                    "foreignField": "gymid",
                    "as": "output"
                }
            },
            { $match: { _id: mongojs.ObjectId(id) } },
        ], function (err, docs) {
            res.json(docs);
        });


    });

    app.get('/gymdata', function (req, res) {
        // db.gymdetails.find(function (err, docs) {
        //     res.json(docs);
        // })
        db.gymdetails.aggregate(
            {
              $lookup: {
                from: "plans",
                localField: "ownerid",
                foreignField: "ownerid",
                as: "plans"
              }
            },
            function (err, docs) {
              if (err) {
                res.json(err);
              }
              res.json(docs);
            }
          )
    });


    app.get('/gymdatacategory/:category', function (req, res) {
        var category = req.params.category;

        // db.gymdetails.find({ categoryname: { $regex: category, $options: 'i' } }, function (err, docs) {
        //     res.json(docs);
        // });
        db.gymdetails.aggregate(
            {
                $match:{"categoryname": { $regex: category, $options: 'i' } }
            },
            {              
              $lookup: {
                from: "plans",
                localField: "ownerid",
                foreignField: "ownerid",
                as: "plans"
              }
            },
            function (err, docs) {
              if (err) {
                res.json(err);
              }
              res.json(docs);
            }
          )

    });

    app.get('/gymdata/:location', function (req, res) {
        var location = req.params.location;

        // db.gymdetails.find({ location: { $regex: location, $options: 'i' } }, function (err, docs) {
        //     res.json(docs);
        // });

        db.gymdetails.aggregate(
            {
                $match:{ location: { $regex: location, $options: 'i' } }
            },
            {              
              $lookup: {
                from: "plans",
                localField: "ownerid",
                foreignField: "ownerid",
                as: "plans"
              }
            },
            function (err, docs) {
              if (err) {
                res.json(err);
              }
              res.json(docs);
            }
          )

        // db.gymdetails.aggregate([
        //     { "$addFields": { "gymid": { "$toString": "$_id" } } },
        //     {
        //         "$lookup": {
        //             "from": "plans",
        //             "localField": "gymid",
        //             "foreignField": "gymid",
        //             "as": "output"
        //         }
        //     },
        //     { $match: { location: { $regex: location, $options: 'i' } } },
        // ], function (err, docs) {
        //     res.json(docs);
        // });
    });


    app.post('/filter', function (req, res) {
      
        var location = req.body.postcode;
        var facility = req.body.facility;
        var category = req.body.category;
        console.log(location);
        // var aminities = req.body.aminities;
        // db.gymdetails.aggregate([
        //     { "$addFields": { "gymid": { "$toString": "$_id" } } },
        //     {
        //         "$lookup": {
        //             "from": "plans",
        //             "localField": "gymid",
        //             "foreignField": "gymid",
        //             "as": "output"
        //         }
        //     },
        //     {
        //         $match: {
        //             $and: [{
        //                 postcode: { $regex: postcode, $options: 'i' }
        //             },
        //             // { selectedAminityList : 
        //             //           { $elemMatch : 
        //             //              {
        //             //               aminities	: {$regex: aminities,$options:'i'}      
        //             //              } 
        //             //           } 
        //             //   } ,
        //             {
        //                 categoryname: { $regex: category, $options: 'i' }
        //             },
        //             {
        //                 selectedFacilityList:
        //                 {
        //                     $elemMatch:
        //                     {
        //                         facilities: { $regex: facility, $options: 'i' }
        //                     }
        //                 }
        //             }
        //             ]
        //         }
        //     }], function (err, docs) {
        //         res.json(docs);
        //     });
        db.gymdetails.aggregate(
            {
                $match:{
                    $and: [
                    { location: { $regex: location, $options: 'i' } },
                    {
                        selectedFacilityList:
                        {
                            $elemMatch:
                            {
                                facilities: { $regex: facility, $options: 'i' }
                            }
                        }
                    },
                    { categoryname: { $regex: category, $options: 'i' } }
                ]
            }
            },
            {              
              $lookup: {
                from: "plans",
                localField: "ownerid",
                foreignField: "ownerid",
                as: "plans"
              }
            },
            function (err, docs) {
              if (err) {
                res.json(err);
              }
              res.json(docs);
            }
          )
        // db.gymdetails.find(
        //     {
        //         $and: [
        //             { location: { $regex: location, $options: 'i' } },
        //             {
        //                 selectedFacilityList:
        //                 {
        //                     $elemMatch:
        //                     {
        //                         facilities: { $regex: facility, $options: 'i' }
        //                     }
        //                 }
        //             },
        //             { categoryname: { $regex: category, $options: 'i' } }
        //         ],

        //     }, function (err, docs) {
        //         console.log(docs);
        //         console.log(err);
        //         res.json(docs);
        //     })

    });

}

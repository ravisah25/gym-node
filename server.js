const express = require('express');
// const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();
var cors = require('cors');
var mongojs = require('mongojs');
var paypal = require('paypal-rest-sdk');
var cookieParser = require('cookie-parser')
var nodemailer = require('nodemailer');
var SMTPServer = require('smtp-server').SMTPServer;

var fs = require('fs');
var multer = require('multer');

var base64ToImage = require('base64-to-image');
const uuid = require('uuid/v4')
const session = require('express-session')
var sess;
const stripe = require("stripe")('sk_test_2pGdgJkO07LfQiFd3OPCNttO');

//app.use(bodyParser.json());


app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

/////////////////////////////////////session////////////////
app.use(session({
  genid: (req) => {
    return uuid() // use UUIDs for session IDs
  },
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

//////////////////file-upload////////////////
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: __dirname + '/file/uploads/' }).any());
/////////////////////////////////////////////
//////////////////////Db-connection///////////////////////
//var db = mongojs('gymdb', [])

var db = mongojs('admin:gym!!%40%40##123@ec2-52-15-58-117.us-east-2.compute.amazonaws.com:27017/gymdb', [])
/////////////////////////////////////////////
const port = 8000;
app.listen(port, () => {
  console.log('We are live on ' + port);
});
///////////Routing///////////////
require('./app/routes')(app, db, sess, {});
require('./app/partner')(app, db, sess, mongojs, {});
require('./app/payment')(app, paypal, sess, {});
require('./app/sendmail')(app, nodemailer, SMTPServer, sess, {});
require('./app/photo')(app, fs, base64ToImage, db, sess, mongojs, {});
require('./app/plans')(app, db, mongojs, sess, {});
require('./app/feedback')(app, db, mongojs, sess, {});
require('./app/banking')(app, db, sess, mongojs, {});
require('./app/offers')(app, db, mongojs, sess, {});

app.get('/logout', function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      res.json('error');
    } else {
      res.json('done');
    }
  });
})


app.get('/session', function (req, res) {
  sess = req.session;
  if (sess.email) {
    res.json("true");
  }
  else {
    res.json("Session out");
  }
})

///////////////////payment/////////////////////
app.post('/stripe', function (req, res) {
  const token = req.body.id;
  charge = stripe.charges.create({
    amount: req.body.total * 100,
    currency: 'EUR',
    description: 'Example charge',
    source: token,
  });
  console.log("charge", charge);
  db.ordercollection.insert(req.body, function (err, docs) {
    res.json(docs);
  });
})


app.get('/orderdetails/:email', function (req, res) {

  // db.ordercollection.aggregate
  //   (
  //   [

  //     {
  //       $lookup: {
  //         from: "gymdetails",
  //         localField: "cartData.gymid.toString()",
  //         foreignField: "_id.toString()",
  //         as: "gymdetails_info"
  //       },
  //       $match: { email: req.params.email }
  //     },
  //     // {
  //     //     $lookup:{
  //     //         from: "plans", 
  //     //         localField: "cartData.gymid.toString()", 
  //     //         foreignField: "gymid.toString()",
  //     //         as: "plans_info"
  //     //     }
  //     // }, 
  //     {
  //       $lookup:
  //       {
  //         from: "review",
  //         localField: "cartData.gymid.toString()",
  //         foreignField: "gymid.toString()",
  //         as: "review_info"
  //       }
  //     },

  //     {
  //       $project: {
  //         gymname: "$gymdetails_info.gymname",
  //         location: "$gymdetails_info.location",
  //         categoryname: "$gymdetails_info.categoryname",
  //         image: "$gymdetails_info.img",
  //         plangnoofdays: "$plans_info.noofdays",
  //         reviewrating: "$review_info.rating",
  //         cartData: "$cartData"
  //       }
  //     }
  //   ], function (err, docs) {
  //     res.json(docs);
  //   });

  var email = req.params.email;
  // console.log(email);
  db.ordercollection.aggregate
    (
    [
      {
        $lookup: {
          from: "gymdetails",
          localField: "cartData.ownerid",
          foreignField: "ownerid",
          as: "gymdetails_info"
        }
      },
      // {
      //   $lookup:
      //   {
      //     from: "review",
      //     localField: "cartData.gymid",
      //     foreignField: "gymid",
      //     as: "review_info"
      //   }
      // },
      {
        $match: {
          $and: [
            { email: { $eq: email } },
            { usertype: { $eq: "user" } }
          ]
        }
      },
      {
        $project: {
          // gymid: "$cartData.gymid",
          // gymname: "$gymdetails_info.gymname",
          cartData: "$cartData",
          date: "$todaydate",
          expiredate: "$expiredate",
          gymemail: "$email",
          total: "$total",
          discount: "$discount"

          // gymdetails: "$gymdetails_info"
        }
      }
    ], function (err, docs) {
      console.log(docs);
      res.json(docs);
    });

});

app.get('/purchasehistory', function (req, res) {
  db.ordercollection.find(function (err, docs) {
    res.json(docs);
  })
});
//first branch
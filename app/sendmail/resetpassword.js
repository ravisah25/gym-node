module.exports = function (app, nodemailer, sess) {



  app.get('/reset', function (req, res) {
    // Only needed if you don't have a real mail account for testing
    nodemailer.createTestAccount((err, account) => {
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport(smtpTransport({
        host: 'smtp.gmail.com',
        service: 'gmail',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'ajay.techprocompsoft@gmail.com', // generated ethereal user
          pass: 'ajay9761771235' // generated ethereal password
        },
        tls: {
          rejectUnauthorized: false
        }
      }));

      // setup email data with unicode symbols
      var mailOptions = {
        from: '"Akash Sharma" <ajay.techprocompsoft@gmail.com>',
        to: 'tech.ajaythakur@gmail.com',
        subject: 'Gym Info',
        text: 'Testing',
        html: '<b>www.techprocompsoft.com</b>' // html body
      };

      // send mail with defined transport object
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          // console.log(error);
        } else {
          // console.log('Email sent: ' + info.response);
        }
      });
    });
  });

  //////////////////////////////////////Send contact ///////////////////

  app.post('/sendcontact', function (req, res) {
    // Only needed if you don't have a real mail account for testing
    nodemailer.createTestAccount((err, account) => {
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'ajay.techprocompsoft@gmail.com', // generated ethereal user
          pass: 'ajay9761771235' // generated ethereal password
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      // setup email data with unicode symbols
      var mailOptions = {
        from: '"Akash Sharma" <ajay.techprocompsoft@gmail.com>',
        to: 'akashtechpro@gmail.com',
        subject: req.body.subject,
        //  text: req.body.description,
        html: '<b>' + req.body.issue + '</b> <br>' + req.body.description + '<br>' + req.body.number + '<br>' + req.body.email // html body
      };

      // send mail with defined transport object
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          res.json( error)

        } else {
          console.log('Email sent: ' + info.response);
          res.json("success")

        }
      });
    });
  });
};

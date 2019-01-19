

module.exports = function (app, paypal, sess) {


}
    // app.get('/pay', function (req, res) {
    //     paypal.configure({
    //         'mode': 'sandbox', //sandbox or live
    //         'client_id': 'EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM',
    //         'client_secret': 'EO422dn3gQLgDbuwqTjzrFgFtaRLRR5BdHEESmha49TM'
    //     });



    //     var payment = {
    //         "intent": "authorize",
    //         "payer": {
    //             "payment_method": "paypal"
    //         },
    //         "redirect_urls": {
    //             "return_url": "http://localhost:4200//dashboard",
    //             "cancel_url": "http://localhost:4200/"
    //         },
    //         "transactions": [{
    //             "amount": {
    //                 "total": 39.00,
    //                 "currency": "USD"
    //             },
    //             "description": " a book on mean stack "
    //         }]
    //     }


        // call the create Pay method 
    //     createPay(payment)
    //         .then((transaction) => {
    //             var id = transaction.id;
    //             var links = transaction.links;
    //             var counter = links.length;
    //             while (counter--) {
    //                 if (links[counter].method == 'REDIRECT') {
    //                     // redirect to paypal where user approves the transaction 
    //                     return res.redirect(links[counter].href)
    //                 }
    //             }
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //             res.redirect('/err');
    //         });

    // });
    // helper functions 
//     var createPay = (payment) => {
//         return new Promise((resolve, reject) => {
//             paypal.payment.create(payment, function (err, payment) {
//                 if (err) {
//                     reject(err);
//                 }
//                 else {
//                     resolve(payment);
//                 }
//             });
//         });
//     }
// };



// var paypal = require('../../');
// require('../configure');

// var paymentId = "PAY-0XL713371A312273YKE2GCNI";

// paypal.payment.get(paymentId, function (error, payment) {
//     if (error) {
//         console.log(error);
//         throw error;
//     } else {
//         console.log("Get Payment Response");
//         console.log(JSON.stringify(payment));
//     }

// });
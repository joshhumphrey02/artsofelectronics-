const express = require('express');
const payment = require('../Controllers/Payments');
const { Authenticate } = require('../models/middlewares');
const router = express();



//router.get('/checkProduct', cartController.checkProduct);
router.get('/payment', payment.payment);
router.get('/pay', Authenticate, payment.pay);



module.exports = router;
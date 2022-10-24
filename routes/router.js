const express = require('express');
const home = require('../Controllers/Home');
const cart = require('../Controllers/Cart');
const checkout = require('../Controllers/Checkout');
const { Authenticate, productsChecked } = require('../models/middlewares');
const router = express.Router();



router.get('/', home.Home);
router.post('/getUser', home.getUser);
router.get('/cart', cart.Cart);
router.get('/checkout', Authenticate, checkout.Checkout);
router.post('/postCart', cart.postCart);
router.get('/getCart', cart.getCart)
router.get('/logout', home.logout);
router.post('/postAddress', Authenticate, checkout.postAddress);
router.get('/getAddress', Authenticate, checkout.getAddress);
//router.post('/postCard', Authenticate, checkout.postCard);
//router.get('/getCard', Authenticate, checkout.getCard);
//router.get('/payment', Authenticate, checkout.payment);
router.get('/p/:category/:name', home.Product);




module.exports = router;
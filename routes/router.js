const express = require('express');
const home = require('../Controllers/Home');
const cart = require('../Controllers/Cart');
const profile = require('../Controllers/Profile');
const forms = require('../Controllers/Forms');
const checkout = require('../Controllers/Checkout');
const payment = require('../Controllers/Payments');
const { Authenticate, productsChecked, loggedIn, cartTransfer, login } = require('../models/middlewares');
const router = express.Router();


// Start of home stuffs
router.get('/', home.Home);
// End of home stuffs

// Start of user stuffs
router.get('/profile', Authenticate, profile.Profile)
router.post('/getUser', home.getUser);
router.post('/postAddress', Authenticate, checkout.postAddress);
router.get('/getAddress', Authenticate, checkout.getAddress);
//router.post('/postCard', Authenticate, checkout.postCard);
//router.get('/getCard', Authenticate, checkout.getCard);
//router.get('/payment', Authenticate, checkout.payment);
// End of user stuffs

// Start of cart stuffs
router.get('/cart', cart.Cart);
router.get('/checkout', Authenticate, checkout.Checkout);
router.post('/postCart', cart.postCart);
router.get('/getCart', cart.getCart)
// End of cart stuffs

// Start of products stuffs
router.get('/p/:category/:name', home.Product);
// End of products stuffs

// Start of payment stuffs
router.get('/cart/payment', payment.payment);
router.get('/cart/pay', Authenticate, payment.pay);
// End of payment stuffs

// Start of forms stuffs
router.get('/form/login', loggedIn, forms.Login);
router.post('/form/login', login, cartTransfer, forms.postLogin);
router.post('/form/register', forms.Register);
router.get('/form/error', forms.Error);
router.post('/form/emailVerification', forms.emailVerification);
router.post('/form/emailCode', forms.emailCode);
router.get('/logout', home.logout);
// End of forms stuffs



module.exports = router;
const express = require('express');
const home = require('../Controllers/Home');
const cart = require('../Controllers/Cart');
const profile = require('../Controllers/Profile');
const forms = require('../Controllers/Forms');
const checkout = require('../Controllers/Checkout');
const payment = require('../Controllers/Payments');
const { Authenticate, logged, cartTransfer, login } = require('../models/middlewares');
const router = express.Router();


// Start of home stuffs
router.get('/', logged, home.Home);
router.get('/p/:category', logged, home.Category);
router.get('/p/:category/:subCategory', logged, home.SubCategory);
router.get('/p/:category/:subCategory/:product', logged, home.Product);
router.get('/p/:category/:subCategory/:product/:description', logged, home.Description);
// End of home stuffs

// Start of user stuffs
router.get('/profile', logged, Authenticate, profile.Profile);
router.get('/profile/:category', logged, Authenticate, profile.Category);
router.post('/user/getUser', profile.getUser);
router.post('/user/postAddress', Authenticate, profile.postAddress);
router.get('/user/getAddress', Authenticate, profile.getAddress);
router.get('/user/payment/comfirmation', Authenticate, payment.Comfirmation);
router.get('/user/payment', Authenticate, payment.Payment);
// End of user stuffs

// Start of cart stuffs
router.get('/cart', logged, cart.Cart);
router.get('/checkout', logged, Authenticate, checkout.Checkout);
router.post('/cart/postCart', cart.postCart);
router.get('/cart/getCart', cart.getCart)
// End of cart stuffs


// Start of forms stuffs
router.post('/form/login', login, cartTransfer, forms.postLogin);
router.post('/form/register', forms.Register);
router.post('/form/emailVerification', forms.emailVerification);
router.post('/form/emailCode', forms.emailCode);
router.get('/logout', forms.logout);
// End of forms stuffs



module.exports = router;
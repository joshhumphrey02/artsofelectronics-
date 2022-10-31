const express = require('express');
const home = require('../Controllers/Home');
const cart = require('../Controllers/Cart');
const profile = require('../Controllers/Profile');
const forms = require('../Controllers/Forms');
const checkout = require('../Controllers/Checkout');
const payment = require('../Controllers/Payments');
const { Authenticate, productsChecked, logged, cartTransfer, login } = require('../models/middlewares');
const router = express.Router();


// Start of home stuffs
router.get('/', logged, home.Home);
router.get('/p/:category', logged, home.Category);
router.get('/p/:category/:subCategory', logged, home.SubCategory);
router.get('/p/:category/:subCategory/:name', logged, home.Product);
// End of home stuffs

// Start of user stuffs
router.get('/profile', logged, Authenticate, profile.Profile)
router.post('/user/getUser', profile.getUser);
router.post('/user/postAddress', Authenticate, profile.postAddress);
router.get('/user/getAddress', Authenticate, profile.getAddress);
router.get('/user/payment/comfirmation', payment.Comfirmation);
router.get('/user/payment', Authenticate, payment.Payment);
//router.post('/postCard', Authenticate, checkout.postCard);
//router.get('/getCard', Authenticate, checkout.getCard);
//router.get('/payment', Authenticate, checkout.payment);
// End of user stuffs

// Start of cart stuffs
router.get('/cart', cart.Cart);
router.get('/checkout', Authenticate, checkout.Checkout);
router.post('/cart/postCart', cart.postCart);
router.get('/cart/getCart', cart.getCart)
// End of cart stuffs


// Start of forms stuffs
router.get('/form/login', logged, forms.Login);
router.post('/form/login', login, cartTransfer, forms.postLogin);
router.post('/form/register', forms.Register);
router.get('/form/error', forms.Error);
router.post('/form/emailVerification', forms.emailVerification);
router.post('/form/emailCode', forms.emailCode);
router.get('/logout', home.logout);
// End of forms stuffs



module.exports = router;
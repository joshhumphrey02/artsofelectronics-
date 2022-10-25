const express = require('express');
const forms = require('../Controllers/Forms');
const { loggedIn, cartTransfer, login } = require('../models/middlewares');
const router = express.Router();

router.get('/login', loggedIn, forms.Login);
router.post('/login', login, cartTransfer, forms.postLogin);
router.post('/register', forms.Register);
router.get('/error', forms.Error);
router.post('/emailVerification', forms.emailVerification);
router.post('/emailCode', forms.emailCode);


module.exports = router;
const express = require('express');
const router = express.Router();
const userControllers = require('../../controllers/users/api/user');
const packageControllers = require('../../controllers/users/api/packageTour');
const bookingControllers = require('../../controllers/users/api/booking');
const Middlewares = require('../../controllers/users/middleware');

router.post('/login',Middlewares.formLogin(),Middlewares.validationForm,userControllers.loginUser)
router.post('/register',Middlewares.formRegis(),Middlewares.validationForm,userControllers.registerUser)
router.post('/confirm_email',Middlewares.checkRefreshToken,Middlewares.formConfirmEmail(),Middlewares.validationForm,userControllers.confEmailUser);
router.get('/resend_otp',Middlewares.checkRefreshToken,userControllers.resendOTPUser);

router.get('/auth_token',Middlewares.checkRefreshToken,userControllers.authToken)

router.get('/search',packageControllers.getFindPackage)
router.post('/search',packageControllers.postFindPackage)
router.post('/booking',Middlewares.checkAccessToken,bookingControllers.allBooking)

module.exports = router;
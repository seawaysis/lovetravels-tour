const express = require('express');
const router = express.Router();
const userControllers = require('../../controllers/users/api/user');
const packageControllers = require('../../controllers/users/api/packageTour');
const bookingControllers = require('../../controllers/users/api/booking');
const Middlewares = require('../../controllers/users/middleware');
const multer = require('multer');

const storageSlip = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'src/images/e_slip/');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname.replace(/[&\/\\#,+()$~%^'":*?<>{} ]/g,''));
  }
});
const fileFillter = {fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            const err = new Error('Only .png, .jpg and .jpeg format allowed!')
            err.name = 'ExtensionError'
            return cb(err);
        }
    },};
const uploadSlip = multer({ storage:storageSlip,fileFillter });

router.post('/login',Middlewares.formLogin(),Middlewares.validationForm,userControllers.loginUser);
router.post('/register',Middlewares.formRegis(),Middlewares.validationForm,userControllers.registerUser);
router.post('/confirm_email',Middlewares.checkRefreshToken,Middlewares.formConfirmEmail(),Middlewares.validationForm,userControllers.confEmailUser);
router.get('/resend_otp',Middlewares.checkRefreshToken,userControllers.resendOTPUser);
router.get('/person_info',Middlewares.checkAccessToken,userControllers.personInfo);
router.patch('/update_person_info',Middlewares.checkAccessToken,Middlewares.formUpdateInfo(),Middlewares.validationForm,userControllers.updatePersonInfo);

router.get('/default_search',packageControllers.defaultSearch);
router.post('/search_package',Middlewares.formSearchPackage(),Middlewares.validationForm,packageControllers.searchPackage);

router.get('/auth_token',Middlewares.checkRefreshToken,userControllers.authToken);
router.get('/all_booking',Middlewares.checkAccessToken,Middlewares.validationForm,bookingControllers.allBooking);
router.get('/payment_detail/:bookingId',Middlewares.checkAccessToken,bookingControllers.paymentDetail);
router.post('/pay_eslip',Middlewares.checkAccessToken,uploadSlip.array('slip',1),Middlewares.formPayESlip(),Middlewares.validationForm,bookingControllers.PayESlip);
router.post('/pay_credit_card',Middlewares.checkAccessToken,Middlewares.formPayCreditCard(),Middlewares.validationForm,bookingControllers.PayCreditCard);

module.exports = router;
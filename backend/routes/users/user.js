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
router.get('/person_info',Middlewares.checkAccessToken,userControllers.personIfo);
router.post('/search_package',Middlewares.formSearchPackage(),Middlewares.validationForm,packageControllers.searchPackage);
router.post('/confirm_email',Middlewares.checkRefreshToken,Middlewares.formConfirmEmail(),Middlewares.validationForm,userControllers.confEmailUser);
router.patch('/update_person_info',Middlewares.checkAccessToken,Middlewares.formUpdateInfo(),Middlewares.validationForm,userControllers.updatePersonInfo);
router.get('/resend_otp',Middlewares.checkRefreshToken,userControllers.resendOTPUser);

router.get('/auth_token',Middlewares.checkRefreshToken,userControllers.authToken);
router.post('/create_booking',Middlewares.checkAccessToken,uploadSlip.array('slip',1),Middlewares.formBooking(),Middlewares.validationForm,bookingControllers.createBooking);
router.get('/all_booking',Middlewares.checkAccessToken,bookingControllers.allBooking);

module.exports = router;
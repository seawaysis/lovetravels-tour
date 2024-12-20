const express = require('express');
const router = express.Router();
const userControllers = require('../../controllers/agents/api/agent');
const bookingControllers = require('../../controllers/agents/api/booking');
const packageControllers = require('../../controllers/agents/api/packageTour');
const accountControllers = require('../../controllers/agents/api/account')
const multer = require('multer');
const Middlewares = require('../../controllers/agents/middleware');

const storageRegister = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'src/images/qrcode/');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname.replace(/[&\/\\#,+()$~%^'":*?<>{} ]/g,''));
  }
});
const storagePackage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'src/images/packageTour/');
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
            const err = new Error('Only .png, .jpg and .jpeg format allowed!');
            err.name = 'ExtensionError'
            return cb(err);
        }
    },};
const uploadRegister = multer({ storage:storageRegister,fileFillter });
const uploadPackage = multer({ storage:storagePackage,fileFillter });

router.post('/login',Middlewares.formLogin(),Middlewares.validationForm,userControllers.loginAgent);
router.post('/register',uploadRegister.array('payment',1),Middlewares.formRegis(),Middlewares.validationForm,userControllers.registerAgent);
router.get('/profile',Middlewares.checkAccessToken,userControllers.profileAgent);
router.post('/change_password',Middlewares.checkAccessToken,Middlewares.formChangePassword(),Middlewares.validationForm,userControllers.changePasswordAgent);
router.post('/edit_profile',Middlewares.checkAccessToken,uploadRegister.array('payment',1),Middlewares.formEditRegis(),Middlewares.validationForm,userControllers.editProfileAgent);
router.post('/confirm_email',Middlewares.checkRefreshToken,Middlewares.formConfirmEmail(),Middlewares.validationForm,userControllers.confEmailAgent);
router.get('/resend_otp',Middlewares.checkRefreshToken,userControllers.resendOTPAgent);

router.post('/add_package',uploadPackage.array('pic_package',5),Middlewares.checkAccessToken,Middlewares.formAddPackage(),Middlewares.validationForm,packageControllers.addPackageTour);
router.post('/edit_package',uploadPackage.array('pic_package',5),Middlewares.checkAccessToken,Middlewares.formEditPackage(),Middlewares.validationForm,packageControllers.editPackageTour);
router.get('/allTaskLog',Middlewares.checkAccessToken,userControllers.allTaskLog);
router.get('/once_package/:id',Middlewares.checkAccessToken,Middlewares.paramIdPackageTour(),Middlewares.validationForm,packageControllers.oncePackageTour);
router.get('/all_package',Middlewares.checkAccessToken,packageControllers.allPackagtTour);
router.get('/all_booking',Middlewares.checkAccessToken,bookingControllers.allBooking);
router.patch('/change_status_booking',Middlewares.checkAccessToken,Middlewares.changeStatusBooking(),Middlewares.validationForm,bookingControllers.changeStatusBooking);
router.patch('/change_status_package',Middlewares.checkAccessToken,Middlewares.changeStatusPackage(),Middlewares.validationForm,packageControllers.changeStatusPackage);
router.post('/summary_account',Middlewares.checkAccessToken,Middlewares.formSummaryAccount(),Middlewares.validationForm,accountControllers.summaryAccount);
router.get('/all_task_log',Middlewares.checkAccessToken,userControllers.allTaskLog);
module.exports = router;
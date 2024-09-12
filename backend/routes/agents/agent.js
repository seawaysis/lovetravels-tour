const express = require('express');
const router = express.Router();
const userControllers = require('../../controllers/agents/api/agent');
const bookingControllers = require('../../controllers/agents/api/booking');
const packageControllers = require('../../controllers/agents/api/packageTour')
const multer = require('multer');
const Middlewares = require('../../controllers/agents/middleware');

const storageRegister = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'src/images/qrcode/')
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname)
  }
})
const storagePackage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'src/images/package_tour/')
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname)
  }
})
const fileFillter = {fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            const err = new Error('Only .png, .jpg and .jpeg format allowed!')
            err.name = 'ExtensionError'
            return cb(err);
        }
    },}
const uploadRegister = multer({ storage:storageRegister,fileFillter })
const uploadPackage = multer({ storage:storagePackage,fileFillter })

router.post('/login',Middlewares.formLogin(),Middlewares.validationForm,userControllers.loginAgent);
router.post('/register',uploadRegister.array('payment',1),Middlewares.formRegis(),Middlewares.validationForm,userControllers.registerAgent);
router.post('/confirm_email',Middlewares.checkRefreshToken,Middlewares.formConfirmEmail(),Middlewares.validationForm,userControllers.confEmailAgent);
router.get('/resend_otp',Middlewares.checkRefreshToken,userControllers.resendOTPAgent);

router.post('/add_package',uploadPackage.array('pic_package',5),Middlewares.checkAccessToken,Middlewares.formAddPackage(),Middlewares.validationForm,packageControllers.addPackageTour);
router.get('/all_package',Middlewares.checkAccessToken,packageControllers.allPackagtTour)
router.post('/booking',bookingControllers.getAllBooking);
router.get('/upload',bookingControllers.uploadPic);

module.exports = router;
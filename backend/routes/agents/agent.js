const express = require('express');
const router = express.Router();
const userControllers = require('../../controllers/agents/api/agent');
const bookingControllers = require('../../controllers/agents/api/booking');
const packageControllers = require('../../controllers/agents/api/package_tour')
const multer = require('multer');
const userMiddlewares = require('../../controllers/agents/middleware');

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

router.post('/login',userMiddlewares.formLogin(),userMiddlewares.validationForm,userControllers.loginAgent);
router.post('/register',uploadRegister.array('payment',1),userMiddlewares.formRegis(),userMiddlewares.validationForm,userControllers.registerAgent);
router.post('/confirm_email',userMiddlewares.checkRefreshToken,userMiddlewares.formConfirmEmail(),userMiddlewares.validationForm,userControllers.confEmailAgent);
router.get('/resend_otp',userMiddlewares.checkRefreshToken,userControllers.resendOTPAgent);

router.post('/add_package',userMiddlewares.checkAccessToken,uploadPackage.array('pic_package',5),userMiddlewares.formAddPackage(),userMiddlewares.validationForm,packageControllers.addPackageTour);
router.get('/all_package',userMiddlewares.checkAccessToken,packageControllers.allPackagtTour)
router.post('/booking',bookingControllers.getAllBooking);
router.get('/upload',bookingControllers.uploadPic);

module.exports = router;
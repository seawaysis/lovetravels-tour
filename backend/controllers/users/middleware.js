
const encryptToken = require('./encrypt');
const {body,param,validationResult} = require('express-validator');
const checkAccessToken = async (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(401).send({message : 'No authorization Token'});
    }else{
        const decoded = await encryptToken.decoded(req.headers.authorization.split(' ')[1]);
        if(decoded.err){
            res.status(401).send({message : decoded.err});
        }else{
          req.decodeToken = decoded;
          next();
        }
    }
}
const checkRefreshToken = async (req, res, next) => {
  if(!req.headers.authorization){
        return res.status(401).send({message : 'No authorization Token'});
    }else{
        const reDecoded = await encryptToken.reDecoded(req.headers.authorization.split(' ')[1]);
        if(reDecoded.err){
            res.status(401).send({message : reDecoded.err});
        }else{
          req.decodeToken = reDecoded;
          next();
        }
    }
}
const validationForm = (req,res,next) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }else{
      next()
    }
}
const formLogin = () => {
  return [
    body('email').trim().not().isEmpty().withMessage('Invalid Email does not Empty')
    .isEmail().withMessage('Invalid Email Address')
    .exists({checkFalsy: true}).withMessage('You must type a password'),
    body('pass').trim().not().isEmpty().withMessage('Invalid Password does not Empty')
    .isLength({min:5}).withMessage('The minimum password length is 5 characters')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{5,}$/).withMessage('The Password must have lowwerletter,upperletter,number least once')
    .exists({checkFalsy: true}).withMessage('You must type a password'),
  ];
}
const formRegis = () => {
  return [
    body('email').trim().not().isEmpty().withMessage('Invalid Email does not Empty')
    .isEmail().withMessage('Invalid Email Address')
    .exists({checkFalsy: true}).withMessage('You must type a email'),
    body('pass').trim().not().isEmpty().withMessage('Invalid Password does not Empty')
    .isLength({min:5}).withMessage('The minimum password length is 5 characters')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{5,}$/).withMessage('The Password must have lowwerletter,upperletter,number least once')
    .exists({checkFalsy: true}).withMessage('You must type a password'),
    body('conf_pass').trim().not().isEmpty().withMessage('Invalid Password does not Empty')
    .isLength({min:5}).withMessage('The minimum password length is 5 characters')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{5,}$/).withMessage('The Password must have lowwerletter,upperletter,number least once')
    .exists({checkFalsy: true}).withMessage('You must type a password')
    .custom((value, {req}) => value === req.body.pass).withMessage("The passwords do not match"),
  ];
}
const formConfirmEmail = () => {
  return [
    body('otp').trim().not().isEmpty().withMessage('Invalid OTP does not Empty')
    .exists({checkFalsy: true}).withMessage('You must type a number')
    .isLength({min:8,max:8}).withMessage('The OTP length is 8 number')
  ];
}
const formUpdateInfo = () => {
  return [
    body('email').trim().not().isEmpty().withMessage('Invalid Email does not Empty')
    .isEmail().withMessage('Invalid Email Address')
    .exists({checkFalsy: true}).withMessage('You must type a email'),
    body('password').trim().not().isEmpty().withMessage('Invalid Password does not Empty')
    .isLength({min:5}).withMessage('The minimum password length is 5 characters')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{5,}$/).withMessage('The Password must have lowwerletter,upperletter,number least once')
    .exists({checkFalsy: true}).withMessage('You must type a password'),
    body('confirm').trim().not().isEmpty().withMessage('Invalid Password does not Empty')
    .isLength({min:5}).withMessage('The minimum password length is 5 characters')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{5,}$/).withMessage('The Password must have lowwerletter,upperletter,number least once')
    .exists({checkFalsy: true}).withMessage('You must type a password')
    .custom((value, {req}) => value === req.body.password).withMessage("The passwords do not match"),
  ];
}
const formSearchPackage = () => {
  return [
    body('search').matches(/^[a-zA-Z0-9ก-๛ ]*$/).withMessage('Not allow special characters'),
    body('checkIn').matches(/^([0-9-]{10})*$/).withMessage('format date is invalid'),
    body('checkOut').matches(/^([0-9-]{10})*$/).withMessage('format date is invalid'),
    body('amount').matches(/^([0-9]{1,2})*$/).withMessage('Only number'),
  ];
}
const paramDetailPayment = () => {
  return[
    param('bookingId').not().isEmpty().withMessage('Invalid booking id dose not empty')
    .exists({checkFalsy: true}).withMessage('type parameter Invalid')
    .matches(/^[a-zA-Z0-9]{20}$/).withMessage('The booking id is normal character only')
    .isLength({max:20}).withMessage('The maximum length is 20 digit')
  ];
}
const formPayESlip = () => {
  return [
    body('amount').matches(/^([0-9])*$/).withMessage('Only number')
      .isLength({min:1}).withMessage('The minimum length is 1 digit')
      .isLength({max:2}).withMessage('The maximum length is 2 digit'),
    body('pricePerson').not().isEmpty().withMessage('Invalid price dose not empty')
      .exists({checkFalsy: true}).withMessage('You must type a number')
      .isLength({min:1}).withMessage('The minimum price length is 1 digit')
      .isLength({max:6}).withMessage('The maximum price length is 6 digit'),
    body('discount').not().isEmpty().withMessage('Invalid discount dose not empty')
      .exists({checkFalsy: true}).withMessage('You must type a number')
      .isLength({min:1}).withMessage('The minimum discount length is 1 digit')
      .isLength({max:2}).withMessage('The maximum discount length is 2 digit'),
    body('checkIn').not().isEmpty().withMessage('Invalid startDate dose not empty')
      .isLength({min:10,max:10}).withMessage('The date length is 10 only')
      .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('The date format invalid'),
    body('checkOut').not().isEmpty().withMessage('Invalid startDate dose not empty')
      .isLength({min:10,max:10}).withMessage('The date length is 10 only')
      .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('The date format invalid'),
    body('packageId').not().isEmpty().withMessage('Invalid days_trip dose not empty')
      .matches(/^[0-9]*$/).withMessage('Only number')
      .exists({checkFalsy: true}).withMessage('You must type a number')
  ];
}
const formPayCreditCard = () => {
  return [
    body('booking.amount').not().isEmpty().withMessage('Invalid amount dose not empty')
      .exists({checkFalsy: true}).withMessage('You must type a number')
      .matches(/^([0-9])*$/).withMessage('Only number')
      .isLength({min:1}).withMessage('The minimum length is 1 digit')
      .isLength({max:2}).withMessage('The maximum length is 2 digit'),
    body('booking.netPrice').not().isEmpty().withMessage('Invalid price dose not empty')
      .exists({checkFalsy: true}).withMessage('You must type a number')
      .isLength({min:1}).withMessage('The minimum price length is 1 digit')
      .isLength({max:6}).withMessage('The maximum price length is 6 digit'),
    body('booking.pricePerson').not().isEmpty().withMessage('Invalid price dose not empty')
      .exists({checkFalsy: true}).withMessage('You must type a number')
      .isLength({min:1}).withMessage('The minimum price length is 1 digit')
      .isLength({max:6}).withMessage('The maximum price length is 6 digit'),
    body('booking.discount').not().isEmpty().withMessage('Invalid discount dose not empty')
      .exists({checkFalsy: true}).withMessage('You must type a number')
      .isLength({min:1}).withMessage('The minimum discount length is 1 digit')
      .isLength({max:2}).withMessage('The maximum discount length is 2 digit'),
    body('booking.checkIn').not().isEmpty().withMessage('Invalid startDate dose not empty')
      .isLength({min:10,max:10}).withMessage('The date length is 10 only')
      .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('The date format invalid'),
    body('booking.checkOut').not().isEmpty().withMessage('Invalid startDate dose not empty')
      .isLength({min:10,max:10}).withMessage('The date length is 10 digit only')
      .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('The date format invalid'),
    body('booking.packageId').not().isEmpty().withMessage('Invalid days_trip dose not empty')
      .matches(/^[0-9]*$/).withMessage('Only number')
      .exists({checkFalsy: true}).withMessage('You must type a number'),
    body('payment.cardNumber').not().isEmpty().withMessage('Invalid price dose not empty')
      .exists({checkFalsy: true}).withMessage('You must type a number')
      .matches(/^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/).withMessage('The credit card format invalid'),
    body('payment.holderName').not().isEmpty().withMessage('Invalid price dose not empty')
      .matches(/^[a-zA-Z0-9ก-๛.\- ]*$/).withMessage('Not allow special characters')
      .isLength({max:100}).withMessage('The Name length is 100 digit only'),
    body('payment.eMonth').not().isEmpty().withMessage('Invalid amount dose not empty')
      .exists({checkFalsy: true}).withMessage('You must type a number')
      .matches(/^([0-9])*$/).withMessage('Only number')
      .isLength({min:2,max:2}).withMessage('The cvv length is 2 digit only'),
    body('payment.eYear').not().isEmpty().withMessage('Invalid amount dose not empty')
      .exists({checkFalsy: true}).withMessage('You must type a number')
      .matches(/^([0-9])*$/).withMessage('Only number')
      .isLength({min:4,max:4}).withMessage('The cvv length is 4 digit only'),
    body('payment.cvv').not().isEmpty().withMessage('Invalid amount dose not empty')
      .exists({checkFalsy: true}).withMessage('You must type a number')
      .matches(/^([0-9])*$/).withMessage('Only number')
      .isLength({min:3,max:4}).withMessage('The cvv length is 3 - 4 digit only'),
  ];
}
module.exports = {
    checkAccessToken,
    checkRefreshToken,
    formLogin,
    formRegis,
    formConfirmEmail,
    formUpdateInfo,
    formSearchPackage,
    paramDetailPayment,
    formPayESlip,
    formPayCreditCard,
    validationForm,
};
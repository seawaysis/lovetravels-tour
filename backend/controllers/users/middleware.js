
const encryptToken = require('./encrypt');
const {body,validationResult} = require('express-validator');
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
  ]
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
  ]
}
const formConfirmEmail = () => {
  return [
    body('otp').trim().not().isEmpty().withMessage('Invalid OTP does not Empty')
    .exists({checkFalsy: true}).withMessage('You must type a number')
    .isLength({min:8,max:8}).withMessage('The OTP length is 8 number')
  ]
}
const formSearchPackage = () => {
  return [
    body('search').matches(/^[a-zA-Z0-9ก-๛ ]*$/).withMessage('Not allow special characters'),
    body('checkIn').matches(/^([0-9-]{10})*$/).withMessage('format date is invalid'),
    body('checkOut').matches(/^([0-9-]{10})*$/).withMessage('format date is invalid'),
    body('amount').matches(/^([0-9]{1,2})*$/).withMessage('Only number'),
  ]
}
const formBooking = () => {
  return [
  body('amount').matches(/^([0-9]{1,2})*$/).withMessage('Only number'),
  body('pricePerson').not().isEmpty().withMessage('Invalid price dose not empty')
    .exists({checkFalsy: true}).withMessage('You must type a number')
    .isLength({min:1}).withMessage('The minimum price length is 1 number')
    .isLength({max:6}).withMessage('The maximum price length is 6 number'),
  body('discount').not().isEmpty().withMessage('Invalid discount dose not empty')
    .exists({checkFalsy: true}).withMessage('You must type a number')
    .isLength({min:1}).withMessage('The minimum discount length is 1 number')
    .isLength({max:2}).withMessage('The maximum discount length is 2 number'),
  body('checkIn').not().isEmpty().withMessage('Invalid startDate dose not empty')
    .isLength({min:10,max:10}).withMessage('The date length is 10 only')
    .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('The date format invalid'),
  body('checkOut').not().isEmpty().withMessage('Invalid startDate dose not empty')
    .isLength({min:10,max:10}).withMessage('The date length is 10 only')
    .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('The date format invalid'),
  body('packageId').not().isEmpty().withMessage('Invalid days_trip dose not empty')
    .exists({checkFalsy: true}).withMessage('You must type a number')
  ]
}
module.exports = {
    checkAccessToken,
    checkRefreshToken,
    formLogin,
    formRegis,
    formConfirmEmail,
    formSearchPackage,
    formBooking,
    validationForm,
};
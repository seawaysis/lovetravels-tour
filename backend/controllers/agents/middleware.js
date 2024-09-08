
const encryptToken = require('./encrypt');
const {body,check,validationResult} = require('express-validator')
const datetime = require('./datetime')

const checkAccessToken = async (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(401).send({message : 'No authorization Token'})
    }else{
        const decoded = await encryptToken.decoded(req.headers.authorization.split(' ')[1])
        if(decoded.err){
            res.status(401).send({message : decoded.err})
        }else{
          req.decodeToken = decoded
          next()
        }
    }
}
const checkRefreshToken = async (req, res, next) => {
  if(!req.headers.authorization){
        return res.status(401).send({message : 'No authorization Token'})
    }else{
        const reDecoded = await encryptToken.reDecoded(req.headers.authorization.split(' ')[1])
        if(reDecoded.err){
            res.status(401).send({message : reDecoded.err})
        }else{
          req.decodeToken = reDecoded
          next()
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
    body('user').trim().not().isEmpty().withMessage('Invalid username does not empty')
    .isLength({min:5}).withMessage('The minimum username length is 5 characters')
    .isLength({max:15}).withMessage('The maximum username length is 15 characters')
    .matches(/^[a-zA-Z0-9_.-]*$/).withMessage('The Usrename allow just characters and number only.')
    .exists({checkFalsy: true}).withMessage('You must type a text'),
    body('pass').trim().not().isEmpty().withMessage('Invalid Password does not empty')
    .isLength({min:5}).withMessage('The minimum password length is 5 characters')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{5,}$/).withMessage('The Password must have lowwerletter,upperletter,number least once')
    .exists({checkFalsy: true}).withMessage('You must type a password'),
  ]
}
const formRegis = () => {
  return [
    body('license').trim().not().isEmpty().withMessage('Invalid license does not empty')
    .exists({checkFalsy: true}).withMessage('You must type a text'),
    body('username').trim().not().isEmpty().withMessage('Invalid Email does not empty')
    .isLength({min:5}).withMessage('The minimum username length is 5 characters')
    .isLength({max:15}).withMessage('The maximum username length is 15 characters')
    .exists({checkFalsy: true}).withMessage('You must type a text'),
    body('email').trim().not().isEmpty().withMessage('Invalid Email does not empty')
    .isEmail().withMessage('Invalid Email Address')
    .exists({checkFalsy: true}).withMessage('You must type a email'),
    body('pass').trim().not().isEmpty().withMessage('Invalid Password does not empty')
    .isLength({min:5}).withMessage('The minimum password length is 5 characters')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{5,}$/).withMessage('The Password must have lowwerletter,upperletter,number least once')
    .exists({checkFalsy: true}).withMessage('You must type a password'),
    body('conf_pass').trim().not().isEmpty().withMessage('Invalid Password does not empty')
    .isLength({min:5}).withMessage('The minimum password length is 5 characters')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{5,}$/).withMessage('The Password must have lowwerletter,upperletter,number least once')
    .exists({checkFalsy: true}).withMessage('You must type a password')
    .custom((value, {req}) => value === req.body.pass).withMessage("The passwords do not match"),
    body('company').trim().not().isEmpty().withMessage('Invalid company does not empty')
    .isLength({max:50}).withMessage('The maximum username length is 50 characters')
    .exists({checkFalsy: true}).withMessage('You must type a text'),
    body('phone').trim().not().isEmpty().withMessage('Invalid phone does not empty')
    .matches(/^[0-9]{9,10}$/).withMessage('The phone is number and lenght number is between 9 - 10')
    .exists({checkFalsy: true}).withMessage('You must type a number'),
    //body('payment').custom((value, {req}) => req.files[0]).withMessage("Invalid file does not Empty"),
  ]
}
const formConfirmEmail = () => {
  return [
    body('otp').trim().not().isEmpty().withMessage('Invalid OTP does not empty')
    .exists({checkFalsy: true}).withMessage('You must type a number')
    .isLength({min:8,max:8}).withMessage('The OTP length is 8 number')
  ]
}
const formAddPackage = () => {
  return [
    body('packageName').not().isEmpty().withMessage('Invalid package name dose not empty')
    .exists({checkFalsy: true}).withMessage('You must type a text'),
    body('description').not().isEmpty().withMessage('Invalid description dose not empty')
    .exists({checkFalsy: true}).withMessage('You must type a text'),
    body('daysTrip').not().isEmpty().withMessage('Invalid days_trip dose not empty')
    .exists({checkFalsy: true}).withMessage('You must type a number')
    .isLength({min:1}).withMessage('The minimum days length is 1 number')
    .isLength({max:2}).withMessage('The maximum days length is 2 number'),
    body('maxPersons').not().isEmpty().withMessage('Invalid max persons dose not empty')
    .exists({checkFalsy: true}).withMessage('You must type a number')
    .isLength({min:1}).withMessage('The minimum max persons length is 1 number')
    .isLength({max:3}).withMessage('The maximum max persons length is 3 number'),
    body('price').not().isEmpty().withMessage('Invalid price dose not empty')
    .exists({checkFalsy: true}).withMessage('You must type a number')
    .isLength({min:1}).withMessage('The minimum price length is 1 number')
    .isLength({max:6}).withMessage('The maximum price length is 6 number'),
    body('priceDiscount').not().isEmpty().withMessage('Invalid discount dose not empty')
    .exists({checkFalsy: true}).withMessage('You must type a number')
    .isLength({min:1}).withMessage('The minimum discount length is 1 number')
    .isLength({max:2}).withMessage('The maximum discount length is 2 number'),
    body('startDate').not().isEmpty().withMessage('Invalid startDate dose not empty')
    .isLength({min:16,max:16}).withMessage('The date length is 10 only')
    .matches(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/).withMessage('The date format invalid'),
    body('startDate').not().isEmpty().withMessage('Invalid startDate dose not empty')
    .isLength({min:16,max:16}).withMessage('The date length is 10 only')
    .matches(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/).withMessage('The date format invalid')
  ]
}
module.exports = {
    checkAccessToken,
    checkRefreshToken,
    formLogin,
    formRegis,
    formConfirmEmail,
    formAddPackage,
    validationForm,
};
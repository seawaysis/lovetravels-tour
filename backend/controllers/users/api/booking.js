const db = require('../../../models');
const {sequelize,Sequelize} = require('../../../models');
const { QueryTypes } = require('sequelize');
const dateTime = require('../datetime');
const Omise = require('omise')({
    publicKey: process.env.OMISE_PUBLIC_KEY,
    secretKey: process.env.OMISE_SECRET_KEY,
    omiseVersion: '2019-05-29'
});

const allBooking = async (req,res) => {
    try{
        const queryText = `SELECT r.*,p.package_name,p.company_name,g.pic_path 
        FROM reservation AS r INNER JOIN member AS m ON r.uid = m.uid 
        INNER JOIN package_tour AS p ON r.package_id = p.package_id 
        LEFT JOIN (SELECT package_id,pic_path FROM gallery GROUP BY package_id ORDER BY update_date DESC) AS g ON r.package_id = g.package_id 
        WHERE m.email = ? GROUP BY r.booking_id ORDER BY r.update_date DESC;`;
        const result = await sequelize.query(queryText, {
            replacements: [req.decodeToken.email],
            type: QueryTypes.SELECT,
        }).then(r => {return r[0] ? r : res.status(400).send({message : 'No member or package !!'});}).catch(e => {res.status(400).send({message : e});});
        const arrPicPath = {packageTour : `${req.protocol}://${req.get('host')}/package_tour/`,e_slip : `${req.protocol}://${req.get('host')}/e_slip/`};
            for(let i =0;i < result.length;i++){
                result[i].pic_path = arrPicPath.packageTour+''+result[i].pic_path;
            }
            res.status(200).send(result);
    }catch{err => {res.status(400).send({message : err})}}
}
const PayESlip = async (req,res) => {
    const body = req.body;
    const reDecoded = req.decodeToken;
    const datetime = dateTime.today();
    if(req.files[0].originalname){
    const result = await checkPackageAndUser(res,{packageId : body.packageId,email:req.decodeToken.email}).then(r => {return r}).catch(err => {res.status(400).send({message : err});});
        try{
            const dataBooking = {booking : {
                amount: body.amount,
                pricePerson: body.pricePerson,
                discount : body.discount,
                checkIn : body.checkIn,
                checkOut : body.checkOut,
                statusBooking : 'pending'
            }}
            const netPrice = ((body.pricePerson * body.amount) - (((body.pricePerson * body.amount) * body.discount)/100));
            const resultBooking = await createBooking(res,dataBooking,result[0]).then(r => {return r;}).catch(err => {res.status(400).send({message : err});});
            const payment = await db.Payment.create({
                    id_paid : datetime.microtime,
                    amount : netPrice,
                    currency : 'thb',
                    status : 'successful',
                    paid_at : datetime.normal,
                    update_date : datetime.normal,
                    method : 'e_slip',
                    pic_receipt_path : req.files[0].originalname,
                    booking_id : resultBooking.dataValues.booking_id,
                    uid : resultBooking.dataValues.uid
                }).then(r => {return r.id_paid ? r : res.status(400).send({message : 'Add Payment fail'});}).catch(err => {res.status(400).send({message : err})});
                res.status(200).send({message : payment});
        }catch{err => {res.status(400).send({message : err});}}
    }else{
        res.status(400).send({message : 'Please upload eslip'});
    }
}
const PayCreditCard = async(req,res) => {
    const body = req.body;
    const reDecoded = req.decodeToken;
    console.log(body);
    res.status(200).send({message : "test"});
    try{
        const result = await checkPackageAndUser(res,{packageId : body.booking.packageId,email:req.decodeToken.email}).then(r => {return r}).catch(err => {res.status(400).send({message : err});});
            const token = await Omise.tokens.create({card : {
                number: body.payment.cardNumber,
                name: body.payment.holderName,
                expiration_month: body.payment.eMonth,
                expiration_year: body.payment.eYear,
                security_code: body.payment.cvv
            }});

            const customer = await Omise.customers.create({
                email: reDecoded.email,
                description: body.payment.holderName,
                card: token.id
            });
            
            const charge = await Omise.charges.create({
                amount : body.booking.netPrice * 100,
                currency : 'thb',
                customer: customer.id
            });
            if(!charge.id){
               res.status(400).send({message : 'Payment fail Please check correct information !!'});
            }else{
                charge.status === 'successful' ? body.booking.statusBooking = 'confirmed' : body.booking.statusBooking = 'pendding';
                const resultBooking = await createBooking(res,body,result[0]).then(r => {return r;}).catch(err => {res.status(400).send({message : err});});
                const payment = await db.Payment.create({
                    id_paid : charge.id,
                    amount : charge.amount/100,
                    currency : charge.currency,
                    status : charge.status,
                    paid_at : charge.paid_at,
                    update_date : charge.paid_at,
                    method : 'credit_card',
                    pic_receipt_path : null,
                    booking_id : resultBooking.dataValues.booking_id,
                    uid : resultBooking.dataValues.uid
                }).then(r => {return r.id_paid ? r : res.status(400).send({message : 'Add Payment fail'});}).catch(err => {res.status(400).send({message : err})});
                res.status(200).send({message : payment});
            }
    }catch{err => {
        res.status(400).send({message : err});
    }}
}
async function checkPackageAndUser (res,dataSearch) {
    try{
        const queryText = `SELECT m.uid,p.package_id FROM member AS m ,package_tour AS p WHERE p.package_id = ? AND m.email = ? LIMIT ?`;
        return await sequelize.query(queryText, {
            replacements: [dataSearch.packageId,dataSearch.email,1],
            type: QueryTypes.SELECT,
        }).then(r => {return r[0] ? r : res.status(400).send({message : 'No member or package !!'});}).catch(e => {res.status(400).send({message : e});});
    }catch{err => {res.status(400).send({message : err})}}
}
    
async function createBooking (res,body,dataSearch) {
    try{
    const datetime = dateTime.today();
    return await db.Reservation.create({
                booking_id:datetime.microtime+''+makeid(5),
                amount:body.booking.amount,
                price_person:body.booking.pricePerson,
                discount:body.booking.discount,
                check_in_date:body.booking.checkIn,
                check_out_date:body.booking.checkOut,
                status:body.booking.statusBooking,
                since_date:datetime.normal,
                update_date:datetime.normal,
                uid:dataSearch.uid,
                package_id:dataSearch.package_id
            }).then(r => {return r.booking_id ? r : res.status(400).send({message : 'Add Booking fail'});}).catch(e => {res.status(400).send({message : e});});
    }catch{
        err => {res.status(400).send({message : err})}
    }
}
function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
module.exports = {
    allBooking,
    PayESlip,
    PayCreditCard
}
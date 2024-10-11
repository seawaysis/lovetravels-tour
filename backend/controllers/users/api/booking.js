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
    const queryText = `SELECT r.*,p.package_name,p.company_name,g.pic_path FROM reservation AS r INNER JOIN member AS m ON r.uid = m.uid INNER JOIN packageTour AS p ON r.package_id = p.package_id LEFT JOIN (SELECT package_id,pic_path FROM gallery GROUP BY package_id ORDER BY update_date DESC) AS g ON r.package_id = g.package_id WHERE m.email = ? GROUP BY r.booking_id ORDER BY r.update_date DESC;`;
    const result = await sequelize.query(queryText, {
        replacements: [req.decodeToken.email],
        type: QueryTypes.SELECT,
    });
    if(!result[0].uid || !result[0].package_id){
        res.status(200).send({message : 'No member or package !!'});
    }else{
        const arrPicPath = {packageTour : `${req.protocol}://${req.get('host')}/package_tour/`,e_slip : `${req.protocol}://${req.get('host')}/e_slip/`};
        for(let i =0;i < result.length;i++){
            result[i].pic_path = arrPicPath.packageTour+''+result[i].pic_path;
            result[i].pic_receipt_path = arrPicPath.e_slip+''+result[i].pic_receipt_path;
        }
        res.status(200).send(result);
    }
}
const createBooking = async (req,res) => {
    const body = req.body;
    const datetime = dateTime.today();
    const queryText = `SELECT m.uid,p.package_id FROM member AS m ,packageTour AS p WHERE p.package_id = ? AND m.email = ? LIMIT ?`;
    const result = await sequelize.query(queryText, {
        replacements: [body.packageId,req.decodeToken.email,1],
        type: QueryTypes.SELECT,
    });
    if(!result[0].uid || !result[0].package_id){
        res.status(500).send({message : 'No member or package !!s'});
    }else{
         const resultBooking = await db.Reservation.create({
            booking_id:makeid(5)+''+datetime.microtime,
            amount:body.amount,
            price_person:body.pricePerson,
            discount:body.discount,
            check_in_date:body.checkIn,
            check_out_date:body.checkOut,
            status:'pending',
            pic_receipt_path:req.files[0].originalname,
            since_date:datetime.normal,
            update_date:datetime.normal,
            uid:result[0].uid,
            package_id:result[0].package_id
        });
        if(!resultBooking.dataValues.booking_id){
            res.status(400).send({message : 'Insert package fail'});
        }else{
            res.status(200).send({message : 'create ok !!'});
        }
    }
}
const PayCreditCard = async(req,res) => {
    const body = req.body;
    const reDecoded = req.decodeToken;
    try{
        const token = await Omise.tokens.create({card : {
        number: body.cardNumber,
        name: body.holderName,
        expiration_month: '09',
        expiration_year: '2025',
        security_code: body.cvv
        }});

        // const customer = await Omise.customers.create({
        //     email: reDecoded.email,
        //     description: body.holderName,
        //     card: token.id
        // });
        
        // const charge = await Omise.charges.create({
        //     amount : body.netPrice * 100,
        //     currency : 'thb',
        //     customer: customer.id
        // });
        res.status(200).send({message : 'done'});
    }catch{err => {
        res.status(400).send({message : err});
    }}
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
    createBooking,
    PayCreditCard
}
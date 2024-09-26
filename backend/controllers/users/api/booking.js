const db = require('../../../models');
const {sequelize,Sequelize} = require('../../../models');
const { QueryTypes } = require('sequelize');
const dateTime = require('../datetime');

const allBooking = async (req,res) => {
    const queryText = `SELECT r.* FROM reservation AS r INNER JOIN member AS m ON  r.uid = m.uid WHERE m.email = ? ORDER BY r.update_date DESC`;
    const result = await sequelize.query(queryText, {
        replacements: [req.decodeToken.email],
        type: QueryTypes.SELECT,
    });
    if(!result[0].uid || !result[0].package_id){
        res.status(200).send({message : 'No member or package !!s'});
    }else{
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
            status:'pendding',
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
    createBooking
}
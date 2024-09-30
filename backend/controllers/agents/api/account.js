const db = require('../../../models');
const {sequelize,Sequelize} = require('../../../models');
const { QueryTypes } = require('sequelize');
const dateTime = require('../datetime');

const summaryAccount = async (req,res) => {
    const result = await sequelize.query(`SELECT p.package_name,r.booking_id,r.amount,r.price_person,r.discount,((r.price_person * r.amount)-((r.price_person * r.amount)*r.discount/100)) as sum_price FROM reservation AS r LEFT JOIN packageTour AS p ON r.package_id = p.package_id WHERE r.check_in_date >= ? AND r.check_out_date <= ? AND r.status = ? ORDER BY r.update_date DESC`, {
            replacements: [req.body.startDate,req.body.endDate,'confirmed'],
            type: QueryTypes.SELECT})
            .then(r => {return r})
            .catch(err => {return err});
   result ? res.status(200).json(result) : res.status(400).json({message : result.code});
}

module.exports = {
    summaryAccount
}
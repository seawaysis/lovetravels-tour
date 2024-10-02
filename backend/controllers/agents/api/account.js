const db = require('../../../models');
const {sequelize,Sequelize} = require('../../../models');
const { QueryTypes } = require('sequelize');
const dateTime = require('../datetime');

const summaryAccount = async (req,res) => {
    const result = await sequelize.query(`SELECT p.package_id,p.package_name,r.booking_id,r.amount,r.price_person,r.discount,((r.price_person * r.amount)) as sum_price,((r.price_person * r.amount)-((r.price_person * r.amount)*r.discount/100)) as sum_net_price FROM reservation AS r LEFT JOIN packageTour AS p ON r.package_id = p.package_id WHERE r.check_in_date >= ? AND r.check_out_date <= ? AND r.status = ? ORDER BY r.update_date DESC`, {
            replacements: [req.body.startDate,req.body.endDate,'confirmed'],
            type: QueryTypes.SELECT})
            .then(r => {return r})
            .catch(err => {return {error : err}});
    if(result.error){
        res.status(400).json({message : result.code});
    }else{
        let setResult = [];
        if(result[0]){
        result.forEach((v,k) => {
            if(!setResult[v.package_id]){
                setResult[v.package_id] = {
                    packageId : v.package_id,
                    packageName : v.package_name,
                    sumAmount : v.amount,
                    sumPrice : v.sum_price,
                    sumNetPrice : v.sum_net_price
                };
            }else if(setResult[v.package_id].packageId === v.package_id){
                setResult[v.package_id].sumAmount += v.amount;
                setResult[v.package_id].sumPrice += v.sum_price;
                setResult[v.package_id].sumNetPrice += v.sum_net_price;
            }
        })};
        res.status(200).json(setResult.filter(n => n));
    }
}

module.exports = {
    summaryAccount
}
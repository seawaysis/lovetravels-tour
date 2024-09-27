const db = require('../../../models');
const {sequelize,Sequelize} = require('../../../models');
const { QueryTypes } = require('sequelize');
const allBooking = async (req,res) => {
    const queryText = `SELECT r.*,p.package_name,p.company_name FROM reservation AS r INNER JOIN member AS m ON r.uid = m.uid INNER JOIN packageTour AS p ON r.package_id = p.package_id GROUP BY r.booking_id ORDER BY r.update_date DESC;`;
    const result = await sequelize.query(queryText, {
        replacements: [],
        type: QueryTypes.SELECT,
    });
    if(!result[0].uid || !result[0].package_id){
        res.status(200).send([]);
    }else{
        const arrPicPath = {packageTour : `${req.protocol}://${req.get('host')}/package_tour/`,e_slip : `${req.protocol}://${req.get('host')}/e_slip/`};
        for(let i =0;i < result.length;i++){
            result[i].pic_path = arrPicPath.packageTour+''+result[i].pic_path;
            result[i].pic_receipt_path = arrPicPath.e_slip+''+result[i].pic_receipt_path;
        }
        res.status(200).send(result);
    }
    res.status(200).send('booking ok !!')
}
module.exports = {
    allBooking
}
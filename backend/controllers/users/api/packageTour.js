const db = require('../../../models');
const {sequelize,Sequelize} = require('../../../models');
const { QueryTypes } = require('sequelize');
const dateTime = require('../datetime');

const searchPackage = async (req,res) => {
    const body = req.body
    const dayTrip = dateTime.countDay({startDate : body.checkIn,endDate : body.checkOut});
    const searchSQL = {
        searchWord : '',
        searchDate : ''
    }
    const arrSearch= []
    arrSearch.push(body.amount);
    if(body.search){
        searchSQL.searchWord = '(p.package_name LIKE ? OR p.description LIKE ?) AND';
        arrSearch.push('%'+body.search+'%');
        arrSearch.push('%'+body.search+'%');
    }
    arrSearch.push(body.checkIn)
    if(body.checkOut){
        searchSQL.searchDate = '(p.start_date <= ? AND p.end_date >= ?)';
        arrSearch.push(body.checkOut);
    }else{
        searchSQL.searchDate = 'p.start_date <= ?';
    }
    arrSearch.push('active');
    arrSearch.push(dayTrip);
    const queryText = `SELECT p.package_id,p.package_name,p.description,p.company_name,p.max_amount,p.price_person,p.discount,a.pic_payment_path,g.pic_path,(IFNULL(r.sum_amount,0) + ?) AS sum_amount FROM packageTour AS p INNER JOIN agent AS a ON p.company_name = a.company_name LEFT JOIN gallery AS g ON p.package_id = g.package_id LEFT JOIN (SELECT package_id,SUM(amount) AS sum_amount FROM reservation WHERE status = 'confirmed' GROUP BY package_id) AS r ON p.package_id = r.package_id WHERE ${searchSQL.searchWord} ${searchSQL.searchDate} AND p.status = ? AND p.days_trip = ?`;
    const temp = await sequelize.query(queryText, {
        replacements: arrSearch,
        type: QueryTypes.SELECT,
    });
    let result = [];
    const arrPicPath = {packageTour : `${req.protocol}://${req.get('host')}/package_tour/`,qrcode : `${req.protocol}://${req.get('host')}/qr_code/`};
    let arrCheck = {countIndex : 0,package_id : ''}
    temp.forEach((v,k) => {
        if(v.sum_amount <= v.max_amount){
            if(v.package_id !== arrCheck.package_id){
                result.push({
                    packageId : v.package_id,
                    package_name : v.package_name,
                    description : v.description,
                    price_person : v.price_person,
                    discount : v.discount,
                    company_name : v.company_name,
                    pic_payment : arrPicPath.qrcode+''+v.pic_payment_path,
                    pic_path : []
                });
                arrCheck.package_id = v.package_id;
                arrCheck.countIndex++;
            }
            result[arrCheck.countIndex-1]['pic_path'].push(arrPicPath.packageTour+''+v.pic_path);
        }
    });
    res.status(200).send(result);
}
const detailDescription = async (req,res) => {
    const queryText = 'SELECT p.package_name,p.description,p.company_name,p.price_person,p.discount,g.pic_path,g.type FROM packageTour AS p LEFT JOIN gallery AS g ON p.package_id = g.package_id WHERE p.package_id = ?';
    const arrSearch = [req.body.package_id];
    const result = await sequelize.query(queryText, {
        replacements: arrSearch,
        type: QueryTypes.SELECT,
    });
    res.status(200).send(result);
}
module.exports={
    searchPackage
}
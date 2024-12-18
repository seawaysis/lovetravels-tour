const db = require('../../../models');
const {sequelize,Sequelize} = require('../../../models');
const { QueryTypes } = require('sequelize');
const dateTime = require('../datetime');
const path = require("path");
const fs = require('fs');

const defaultSearch = async (req,res) => {
    let files = fs.readdirSync(path.join(__dirname, "../../../src/images/bgSearch/"));
    const pathBg = files.map(v => {return `${req.protocol}://${req.get('host')}/bg_search/`+v});
    const checkIn = dateTime.today().rawDate;
    let checkOut = dateTime.today().rawDate;
    checkOut.setDate(checkOut.getDate() + 2);
    res.status(200).json({ search: '',checkIn : checkIn.toISOString().split('T')[0],checkOut : checkOut.toISOString().split('T')[0],amount :1,bgSearch : pathBg});
    //res.status(200).json({ search: '',checkIn : '2024-11-15',checkOut : '2024-11-17',amount :1,bgSearch : pathBg});
}
const searchPackage = async (req,res) => {
    const body = req.body
    const dayTrip = dateTime.countDay({startDate : body.checkIn,endDate : body.checkOut});
    const searchSQL = {
        searchWord : '',
        searchDate : ''
    }
    const arrSearch= []
    //arrSearch.push(body.amount);
    if(body.search){
        searchSQL.searchWord = '(p.package_name LIKE ? OR p.description LIKE ?) AND';
        arrSearch.push('%'+body.search+'%');
        arrSearch.push('%'+body.search+'%');
    }
    arrSearch.push(body.checkIn)
    if(body.checkOut){
        searchSQL.searchDate = '(DATE(p.start_date) <= ? AND DATE(p.end_date) >= ?)';
        arrSearch.push(body.checkOut);
    }else{
        searchSQL.searchDate = 'p.start_date <= ?';
    }
    arrSearch.push('active');
    arrSearch.push(dayTrip);
    const queryText = `SELECT p.package_id,p.package_name,p.description,p.company_name,p.max_amount,p.price_person,p.discount,a.pic_payment_path,g.pic_path,r.sum_amount AS sum_amount FROM package_tour AS p INNER JOIN agent AS a ON p.company_name = a.company_name LEFT JOIN gallery AS g ON p.package_id = g.package_id LEFT JOIN (SELECT package_id,SUM(amount) AS sum_amount FROM reservation WHERE status = 'confirmed' GROUP BY package_id) AS r ON p.package_id = r.package_id WHERE ${searchSQL.searchWord} ${searchSQL.searchDate} AND p.status = ? AND p.days_trip = ? ORDER BY package_id DESC`;
    const temp = await sequelize.query(queryText, {
        replacements: arrSearch,
        type: QueryTypes.SELECT,
    });
    let result = [];
    const arrPicPath = {packageTour : `${req.protocol}://${req.get('host')}/package_tour/`,qrcode : `${req.protocol}://${req.get('host')}/qr_code/`};
    let arrCheck = {countIndex : 0,package_id : ''}
    temp.forEach((v,k) => {
        v.sum_amount === null ? v.sum_amount = body.amount : v.sum_amount = v.sum_amount+body.amount;
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
    const queryText = 'SELECT p.package_name,p.description,p.company_name,p.price_person,p.discount,g.pic_path,g.type FROM package_tour AS p LEFT JOIN gallery AS g ON p.package_id = g.package_id WHERE p.package_id = ?';
    const arrSearch = [req.body.package_id];
    const result = await sequelize.query(queryText, {
        replacements: arrSearch,
        type: QueryTypes.SELECT,
    });
    res.status(200).send(result);
}
module.exports={
    defaultSearch,
    searchPackage
}
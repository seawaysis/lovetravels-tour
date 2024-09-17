const db = require('../../../models');
const {sequelize,Sequelize} = require('../../../models');
const { QueryTypes } = require('sequelize');

const searchPackage = async (req,res) => {
    const body = req.body
    const searchSQL = {
        searchWord : '',
        searchDate : ''
    }
    const arrSearch= []
    arrSearch.push(body.amount)
    if(body.search){
        searchSQL.searchWord = '(p.package_name LIKE ? OR p.description LIKE ?) AND'
        arrSearch.push('%'+body.search+'%')
        arrSearch.push('%'+body.search+'%')
    }
    arrSearch.push(body.checkIn)
    if(body.checkOut){
        searchSQL.searchDate = '(p.start_date <= ? AND p.end_date >= ?)'
        arrSearch.push(body.checkOut)
    }else{
        searchSQL.searchDate = 'p.start_date <= ?';
    }
    arrSearch.push('active')
    const queryText = `SELECT p.package_name,p.description,p.company_name,p.max_amount,p.price_person,p.discount,g.pic_path,g.package_id,(IFNULL(r.sum_amount,0) + ?) AS sum_amount FROM packageTour AS p LEFT JOIN gallery AS g ON p.package_id = g.package_id LEFT JOIN (SELECT package_id,SUM(amount) AS sum_amount FROM reservation WHERE status = 'confirmed' GROUP BY package_id) AS r ON p.package_id = r.package_id WHERE ${searchSQL.searchWord} ${searchSQL.searchDate} AND p.status = ?`;
    const temp = await sequelize.query(queryText, {
        replacements: arrSearch,
        type: QueryTypes.SELECT,
    });
    let result = []
    const fullHost = `${req.protocol}://${req.get('host')}/package_tour/`
    temp.forEach((v,k) => {
        if(v.sum_amount <= v.max_amount){
            temp[k].pic_path = fullHost+''+temp[k].pic_path
            result.push(temp[k])
        }
    });
    console.log(result)
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
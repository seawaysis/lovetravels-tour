const db = require('../../../models');
const {sequelize,Sequelize} = require('../../../models');
const { QueryTypes } = require('sequelize');

const searchPackage = async (req,res) => {
    const body = req.body
    const searchSQL = {
        searchWord : '',
        searchDate : '',
        searchAmount : ''
    }
    const arrSearch= []
    console.log(body)
    if(body.search){
        searchSQL.searchWord = '(p.package_name LIKE ? OR p.description LIKE ?)'
        arrSearch.push('%'+body.search+'%')
        arrSearch.push('%'+body.search+'%')
    }
    arrSearch.push(body.checkIn)
    if(body.checkout){
        searchSQL.searchDate = '(p.start_date <= ? AND p.end_date >= ?)'
        arrSearch.push(body.checkOut)
    }else{
        searchSQL.searchDate = 'p.start_date <= ?';
    }
    arrSearch.push(body.amount)
    arrSearch.push('active')
    searchSQL.searchAmount = 'p.max_amount > ?';
    const queryText = `SELECT p.package_name,p.description,p.company_name,p.price_person,p.discount,g.pic_path,g.package_id FROM packageTour AS p LEFT JOIN gallery AS g ON p.package_id = g.package_id WHERE ${searchSQL.searchWord} AND ${searchSQL.searchDate} AND ${searchSQL.searchAmount} AND p.status = ?`;
    console.log(queryText)
    console.log(arrSearch)
    const result = await sequelize.query(queryText, {
        replacements: arrSearch,
        type: QueryTypes.SELECT,
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
    res.status(200).send({message: result});
}
module.exports={
    searchPackage
}
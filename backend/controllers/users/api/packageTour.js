const db = require('../../../models');
const {sequelize,Sequelize} = require('../../../models');
const { QueryTypes } = require('sequelize');

const getFindPackage = async (req,res) => {
    const queryText = 'SELECT p.package_name,p.description,p.company_name,p.price_person,p.discount,g.pic_path,g.type FROM package_tour AS p LEFT JOIN gallery AS g ON p.package_id = g.package_id';
    const arrSearch = [];
    const result = await sequelize.query(queryText, {
        replacements: arrSearch,
        type: QueryTypes.SELECT,
    });
    res.status(200).send({message: result});
}
const postFindPackage = async (req,res) => {
    const queryText = 'SELECT p.package_name,p.description,p.company_name,p.price_person,p.discount,g.pic_path,g.type FROM package_tour AS p LEFT JOIN gallery AS g ON p.package_id = g.package_id WHERE p.package_name LIKE %?% AND p.start_date >= ? AND p.end_date <= ? AND p.max_amount <= ?';
    const arrSearch = [req.body.search,req.body.startDate,req.bodyendDate,req.body.amount];
    const result = await sequelize.query(queryText, {
        replacements: arrSearch,
        type: QueryTypes.SELECT,
    });
    res.status(200).send({message: result});
}
const detailDescription = async (req,res) => {
    const queryText = 'SELECT p.package_name,p.description,p.company_name,p.price_person,p.discount,g.pic_path,g.type FROM package_tour AS p LEFT JOIN gallery AS g ON p.package_id = g.package_id WHERE p.package_id = ?';
    const arrSearch = [req.body.package_id];
    const result = await sequelize.query(queryText, {
        replacements: arrSearch,
        type: QueryTypes.SELECT,
    });
    res.status(200).send({message: result});
}
module.exports={
    getFindPackage,
    postFindPackage
}
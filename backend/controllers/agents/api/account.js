const db = require('../../../models');
const {sequelize,Sequelize} = require('../../../models');
const { QueryTypes } = require('sequelize');
const dateTime = require('../datetime');

const summaryAccount = (req,res) => {
    res.status(200).send({message : 'summary acc. '});
}

module.exports = {
    summaryAccount
}
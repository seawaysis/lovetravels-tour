const db = require('../../../models');
const {sequelize,Sequelize} = require('../../../models');
const { QueryTypes } = require('sequelize');

const allBooking = (req,res) => {
    res.status(200).send({message : 'get booking ok '})
}
const createBooking = (req,res) => {
    console.log(req.body);
    res.status(200).send({message : 'create ok !!'})
}
module.exports = {
    allBooking,
    createBooking
}
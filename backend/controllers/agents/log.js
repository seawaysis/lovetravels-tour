const db = require('../../models');
const {sequelize,Sequelize} = require('../../models');
const { QueryTypes } = require('sequelize');

const taskLog = async (arr) => {
    return await db.Agent_log.create({
                task: arr.task,
                ip_address : arr.ip,
                username : arr.username
            });
}
module.exports = {
    taskLog
};
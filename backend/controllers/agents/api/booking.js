const db = require('../../../models');
const {sequelize,Sequelize} = require('../../../models');
const { QueryTypes } = require('sequelize');
const dateTime = require('../datetime');

const allBooking = async (req,res) => {
    const queryText = `SELECT r.*,p.package_name,m.email FROM reservation AS r INNER JOIN member AS m ON r.uid = m.uid INNER JOIN package_tour AS p ON r.package_id = p.package_id GROUP BY r.booking_id ORDER BY r.update_date DESC;`;
    const result = await sequelize.query(queryText, {
        replacements: [],
        type: QueryTypes.SELECT,
    });
    if(!result){
        res.status(200).send([]);
    }else{
        res.status(200).send(result);
    }
}
const changeStatusBooking = async (req,res) => {
    const body = req.body;
    const datetime = dateTime.today();
    const result = await sequelize.query('SELECT booking_id FROM reservation WHERE booking_id = ? LIMIT ?', {
                replacements: [body.id,1],
                type: QueryTypes.SELECT,
            });
            if (!Object.keys(result).length){
                res.status(400).send({message :`Booking not found !!`});
            }else{
    const update = await db.Reservation.update({
                        status: body.status,
                        update_date: datetime.normal,
                    },{
                        where: {booking_id:result[0].booking_id}
                    }).then(res => {return res}).catch(err => {return {error : err}});
                update.error ? res.status(400).send({message : update.error}) : res.status(200).send({message: 'Change status booking successfully !!'});
                }
            };
module.exports = {
    allBooking,
    changeStatusBooking
}
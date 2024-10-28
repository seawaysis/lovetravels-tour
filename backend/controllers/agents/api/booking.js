const db = require('../../../models');
const {sequelize,Sequelize} = require('../../../models');
const { QueryTypes } = require('sequelize');
const dateTime = require('../datetime');

const allBooking = async (req,res) => {
    const queryText = `SELECT r.*,p.package_name,pay.id_paid,pay.amount AS amount_paid,pay.status AS status_paid,pay.paid_at,pay.method,pic_receipt_path FROM reservation AS r INNER JOIN package_tour AS p ON r.package_id = p.package_id LEFT JOIN payment AS pay ON r.booking_id = pay.booking_id ORDER BY CASE WHEN r.status = 'pending' THEN 0 ELSE 1 END,r.status ASC,r.update_date DESC`;
    const temp = await sequelize.query(queryText, {
        replacements: [],
        type: QueryTypes.SELECT,
    });
    if(!temp){
        res.status(200).send([]);
    }else{
        let result = [];
        let arr = {pervId : '',tempIndex : 0};
        const fullHost = `${req.protocol}://${req.get('host')}/e_slip/`;
        temp.forEach((v,i) => {
            if(arr.pervId === '' || arr.pervId !== v.booking_id){
                result.push(
                {
                    booking_id : v.booking_id,
                    amount : v.amount,
                    price_person : v.price_person,
                    discount : v.discount,
                    check_in_date : v.check_in_date,
                    check_out_date : v.check_out_date,
                    status : v.status,
                    since_date : v.since_date,
                    email : v.email,
                    paymentDetail : []
                }
                );
                arr.pervId = v.booking_id;
            }
            arr.tempIndex = result.length -1;
                result[arr.tempIndex].paymentDetail.push(
                    {
                            id_paid : v.id_paid,
                            amount : v.amount_paid,
                            status : v.status_paid,
                            paid_at : v.paid_at,
                            method : v.method,
                            pic_receipt_path : v.pic_receipt_path ? fullHost+v.pic_receipt_path : v.pic_receipt_path
                        }
                );
                console.log(result[arr.tempIndex].paymentDetail);
        });
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
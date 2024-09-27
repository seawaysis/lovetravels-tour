
const db = require('../../../models');
const {sequelize,Sequelize} = require('../../../models');
const { QueryTypes } = require('sequelize');
const encryptToken = require('../encrypt');
const dateTime = require('../datetime');

const addPackageTour = async (req,res) => {
    const datetime = dateTime.today();
    const body = req.body;
    const pic = req.files
    const decodeToken = req.decodeToken
    const resultAgent = await sequelize.query('SELECT * FROM agent WHERE username = ? LIMIT 1', {
        replacements: [decodeToken.username],
        type: QueryTypes.SELECT,
    });
    if (!Object.keys(resultAgent).length){
        res.status(400).send({message : 'Agent not found '})
    }else{
        const resultPackage = await db.PackageTour.create({
            package_name:body.packageName,
            description:body.description,
            max_amount:body.maxPersons,
            days_trip:body.daysTrip,
            company_name:resultAgent[0].company_name,
            price_person:body.price,
            discount:body.priceDiscount,
            start_date:body.startDate,
            end_date:body.endDate,
            status:'active',
            update_date: datetime.normal,
            username: resultAgent[0].username
        })
        if(!resultPackage.dataValues.package_id){
            res.status(400).send({message : 'Insert package fail'})
        }else{
            let count = 1
            await Promise.all(pic.map(async (file) => {
                result = await db.Gallery.create({
                    pic_path: file.originalname,
                    type:count++,
                    update_date: datetime.normal,
                    package_id: resultPackage.dataValues.package_id
                });
                //result.dataValues.id
            }));
            res.status(200).send("add package ok !!")
        }
    }
}
const allPackagtTour = async (req,res) => {
    const body = req.body;
    const decodeToken = req.decodeToken
    const fullHost = `${req.protocol}://${req.get('host')}/package_tour/`
    const result = await sequelize.query(`SELECT packageTour.package_id,packageTour.package_name,packageTour.description,packageTour.company_name,packageTour.max_amount,packageTour.days_trip,packageTour.price_person,packageTour.discount,packageTour.start_date,packageTour.end_date,packageTour.status,CONCAT(?,gallery.pic_path) AS pic_url FROM packageTour LEFT JOIN gallery ON packageTour.package_id = gallery.package_id WHERE packageTour.username = ? GROUP BY packageTour.package_name ORDER BY packageTour.update_date DESC`, {
            replacements: [fullHost,decodeToken.username],
            type: QueryTypes.SELECT})
            .then(r => {return r})
            .catch(err => {return err});
   result.parent ? res.status(400).json({message : result.parent.code}) : res.status(200).json(result)
}
const changeStatusPackage = async (req,res) => {
    const body = req.body;
    const datetime = dateTime.today();
    const result = await sequelize.query('SELECT package_id FROM packageTour WHERE package_id = ? LIMIT ?', {
                replacements: [body.id,1],
                type: QueryTypes.SELECT,
            });
            if (!Object.keys(result).length){
                res.status(400).send({message :`Package tour not found !!`});
            }else{
    const update = await db.PackageTour.update({
                status: body.status,
                update_date: datetime.normal,
            },{
                where: {package_id:result[0].package_id}
            }).then(res => {return res}).catch(err => {return {error : err}});
        update.error ? res.status(400).send({message : update.error}) : res.status(200).send({message: 'Change status booking successfully !!'});
    }
}
module.exports = {
    addPackageTour,
    allPackagtTour,
    changeStatusPackage
}
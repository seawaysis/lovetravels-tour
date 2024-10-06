
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
    const decodeToken = req.decodeToken;
    const fullHost = `${req.protocol}://${req.get('host')}/package_tour/`;
    const result = await sequelize.query(`SELECT p.package_id,p.package_name,p.description,p.company_name,p.max_amount,p.days_trip,p.price_person,p.discount,p.start_date,p.end_date,p.status,CONCAT(?,g.pic_path) AS pic_url FROM packageTour AS p LEFT JOIN gallery AS g ON p.package_id = g.package_id WHERE p.username = ? GROUP BY p.package_name ORDER BY p.package_id DESC,p.update_date DESC`, {
            replacements: [fullHost,decodeToken.username],
            type: QueryTypes.SELECT})
            .then(r => {return r})
            .catch(err => {return err});
   result.parent ? res.status(400).json({message : result.parent.code}) : res.status(200).json(result)
}
const oncePackageTour =async (req,res) => {
    const packageId = req.params.id;
    const decodeToken = req.decodeToken;
    const fullHost = `${req.protocol}://${req.get('host')}/package_tour/`;
    const temp = await sequelize.query(`SELECT p.package_id,p.package_name,p.description,p.company_name,p.max_amount,p.days_trip,p.price_person,p.discount,p.start_date,p.end_date,p.status,CONCAT(?,g.pic_path) AS pic_url FROM packageTour AS p LEFT JOIN gallery AS g ON p.package_id = g.package_id WHERE p.username = ? AND p.package_id = ?`, {
            replacements: [fullHost,decodeToken.username,packageId],
            type: QueryTypes.SELECT})
            .then(r => {return r})
            .catch(err => {return err});
    if(temp.parent){
        res.status(400).json({message : temp.parent.code});
    }else{
        let result = {};
        temp.forEach((v,k) => {
            if(k === 0){
                result = {
                    packageId : v.package_id,
                    packageName : v.package_name,
                    description : v.description,
                    daysTrip : v.days_trip,
                    maxPersons : v.max_amount,
                    price : v.price_person,
                    priceDiscount : v.discount,
                    startDate : v.start_date,
                    endDate : v.end_date,
                    picPath : []
                };
            }
            result['picPath'].push(v.pic_url);
    });
        res.status(200).json(result);
    }
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
    oncePackageTour,
    changeStatusPackage
}
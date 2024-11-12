
const db = require('../../../models');
const {sequelize,Sequelize} = require('../../../models');
const { QueryTypes } = require('sequelize');
const encryptToken = require('../encrypt');
const dateTime = require('../datetime');
const log = require('../log');
const fs = require('fs');
const path = require('path');

const addPackageTour = async (req,res) => {
    const datetime = dateTime.today();
    const body = req.body;
    const pic = req.files;
    const decodeToken = req.decodeToken;
    const resultAgent = await sequelize.query('SELECT * FROM agent WHERE username = ? LIMIT 1', {
        replacements: [decodeToken.username],
        type: QueryTypes.SELECT,
    });
    if (!Object.keys(resultAgent).length){
        res.status(400).send({message : 'Agent not found '})
    }else{
        const resultPackage = await db.Package_tour.create({
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
            await Promise.all(pic.map(async (file) => {
                result = await db.Gallery.create({
                    pic_path: file.originalname,
                    update_date: datetime.normal,
                    package_id: resultPackage.dataValues.package_id
                });
                //result.dataValues.id
            }));
            await log.taskLog({
                task : 'add Package '+body.packageName,
                ip : req.headers['x-forwarded-for'] || req.connection.remoteAddress,
                username : resultAgent[0].username
            });
            res.status(200).send("add package ok !!")
        }
    }
}
const allPackagtTour = async (req,res) => {
    const body = req.body;
    const decodeToken = req.decodeToken;
    const fullHost = `${req.protocol}://${req.get('host')}/package_tour/`;
    const result = await sequelize.query(`SELECT p.package_id,p.package_name,p.description,p.company_name,p.max_amount,p.days_trip,p.price_person,p.discount,p.start_date,p.end_date,p.status,CONCAT(?, (SELECT g.pic_path FROM gallery g WHERE g.package_id = p.package_id LIMIT 1)) AS pic_url FROM package_tour AS p WHERE p.username = ? ORDER BY p.package_id DESC, p.update_date DESC;
`, {
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
    const temp = await sequelize.query(`SELECT p.package_id,p.package_name,p.description,p.company_name,p.max_amount,p.days_trip,p.price_person,p.discount,p.start_date,p.end_date,p.status,g.pic_path,CONCAT(?,g.pic_path) AS pic_url FROM package_tour AS p LEFT JOIN gallery AS g ON p.package_id = g.package_id WHERE p.username = ? AND p.package_id = ?`, {
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
            result['picPath'].push({namePic : v.pic_path,fullPath : v.pic_url});
    });
        res.status(200).json(result);
    }
}
const editPackageTour = async (req,res) => {
    const body = req.body;
    const pic = req.files
    const decodeToken = req.decodeToken;
    const datetime = dateTime.today();
    const result= await sequelize.query('SELECT p.package_id,g.id,g.pic_path FROM package_tour AS p  LEFT JOIN gallery AS g ON p.package_id = g.package_id WHERE p.username = ? AND p.package_id = ?', {
        replacements: [decodeToken.username,body.packageId],
        type: QueryTypes.SELECT,
    });
    if(result.parent){
        res.status(400).json({message : temp.parent.code});
    }else{
         const update = await db.Package_tour.update({
                package_name: body.packageName,
                description : body.description,
                days_trip : body.daysTrip,
                max_amount :body.maxPersons,
                price_person : body.price,
                discount : body.priceDiscount,
                start_date : body.startDate,
                end_date : body.endDate,
                update_date: datetime.normal,
            },{
                where: {package_id:result[0].package_id}
            }).then(res => {return res}).catch(err => {return {error : err}});
        if(update.error){
            res.status(400).send({message : update.error});
        }else{
            //delete picture files and path in db
            const arrPic = body.deletePic.split(',');
            if(arrPic[0] !== 'undefined'){
                const arrId = [];
                result.forEach(v => {
                    arrPic.filter(c => {c === v.pic_path ? arrId.push(v.id) : null});
                });
                arrPic.forEach(n => {
                    fs.unlink(path.join(__dirname, "../../../src/images/package_tour/"+n), (err) => {
                        if (err) {
                            console.error(`Error deleting the file ${n}:`, err);
                        }
                    });
                });
                const deletePic = await db.Gallery.destroy({ where: { id: arrId }}).then(res => {return res}).catch(err => {return {error : err}});
                if(deletePic.error){
                    res.status(400).send({message : deletePic.error});
                }
            }
            //update new pic
            if(pic){
                try{
                await Promise.all(pic.map(async (file) => {
                    let newPic = await db.Gallery.create({
                        pic_path: file.originalname,
                        update_date: datetime.normal,
                        package_id: result[0].package_id
                    });
                //result[0].package_id
                }));
            }catch{err => {
                res.status(400).send({message : err});
                }
            }
            }
            await log.taskLog({
                task : 'edit Package '+body.packageName,
                ip : req.headers['x-forwarded-for'] || req.connection.remoteAddress,
                username : decodeToken.username
            });
            res.status(200).send({message : 'Edit package tour successfully'});
        }
    }
}
const changeStatusPackage = async (req,res) => {
    const body = req.body;
    const datetime = dateTime.today();
    const decodeToken = req.decodeToken;
    const result = await sequelize.query('SELECT package_id FROM package_tour WHERE package_id = ? LIMIT ?', {
                replacements: [body.id,1],
                type: QueryTypes.SELECT,
            });
            if (!Object.keys(result).length){
                res.status(400).send({message :`Package tour not found !!`});
            }else{
    const update = await db.Package_tour.update({
                status: body.status,
                update_date: datetime.normal,
            },{
                where: {package_id:result[0].package_id}
            }).then(res => {return res}).catch(err => {return {error : err}});
        update.error ? res.status(400).send({message : update.error}) :await log.taskLog({
                task : 'Changed status package '+result[0].package_id,
                ip : req.headers['x-forwarded-for'] || req.connection.remoteAddress,
                username : decodeToken.username
            }); res.status(200).send({message: 'Change status booking successfully !!'});
    }
}
module.exports = {
    addPackageTour,
    allPackagtTour,
    oncePackageTour,
    editPackageTour,
    changeStatusPackage
}
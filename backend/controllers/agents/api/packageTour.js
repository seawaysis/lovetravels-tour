
const db = require('../../../models');
const {sequelize,Sequelize} = require('../../../models');
const { QueryTypes } = require('sequelize');
const encryptToken = require('../encrypt');
const datetime = require('../datetime');

const addPackageTour = async (req,res) => {
    const body = req.body;
    const pic = req.files
    const reDecoded = req.decodeToken
            const resultAgent = await sequelize.query('SELECT * FROM agent WHERE username = ? LIMIT 1', {
            replacements: [reDecoded.username],
            type: QueryTypes.SELECT,
            });
            if (!Object.keys(resultAgent).length){
                res.status(400).send({message : 'Agent not found '})
            }else{
                const resultPackage = await db.PackageTour.create({
                    package_name:body.packageName,
                    description:body.description,
                    max_amount:body.maxPersons,
                    company_name:resultAgent[0].company_name,
                    price_person:body.price,
                    discount:body.priceDiscount,
                    start_date:body.startDate,
                    end_date:body.endDate,
                    update_date: datetime.today(),
                    username: resultAgent[0].username

                })
                console.log(resultPackage)
        //         if(!resultPackage.dataValues.package_id){
        //             res.status(400).send({message : 'Insert package fail'})
        //         }else{
        //             let count = 1
        //             await Promise.all(pic.map(async (file) => {
        //                 result = await db.Gallery.create({
        //                     pic_path: file.originalname,
        //                     type:count++,
        //                     update_date: datetime.today(),
        //                     package_id: resultPackage.dataValues.package_id
        //                 });
        //                 //result.dataValues.id
        //             }));
        //             res.status(200).send("add package ok !!")
        // }
        res.status(200).send("add package ok !!")
    }
}
const allPackagtTour = async (req,res) => {
    const body = req.body;
    console.log(req.decodeToken)
    const resultAgent = await sequelize.query('SELECT * FROM package WHERE username = ? LIMIT 1', {
            replacements: [reDecoded.username],
            type: QueryTypes.SELECT,
            });
    res.status(200).send("all package ok !!")
}
module.exports = {
    addPackageTour,
    allPackagtTour
}
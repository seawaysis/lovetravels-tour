const db = require('../../../models');
const {sequelize,Sequelize} = require('../../../models');
const { QueryTypes } = require('sequelize');
const bcryptjs = require('bcryptjs');
const dateTime = require('../datetime');
const encryptToken = require('../encrypt');
const log = require('../log');
const email = require('../email');
const fs = require('fs');
const path = require('path');

const loginAgent = async (req,res) => {
    const datetime = dateTime.today();
    const body = req.body;
    const result = await sequelize.query('SELECT * FROM agent WHERE username = ?', {
        replacements: [body.user],
        type: QueryTypes.SELECT,
    });
    if (!Object.keys(result).length){
        res.status(400).send({message : 'Username or Password is exist'});
    }else{
        const dePass = bcryptjs.compareSync(body.pass,result[0].password);
        if(!dePass){
            res.status(400).send({message: "Username or Password is wrong !!"})
        }else if(result[0].conf_email.length !== 8){
            const confEncoded = await getConfirmToken(result[0].email)
            res.status(200).send({confirmToken : confEncoded,redirect : 'confirm_email'});
        }else{
            const encoded = await encryptToken.encoded({username: result[0].username,typeRole: 'agent'});
            const reEncoded = await encryptToken.reEncoded({username: result[0].username,typeRole: 'agent'});
            await db.Agent.update({
                update_date: datetime.normal
            },{
                where: {username:result[0].username}
            });
            await log.taskLog({
                task : 'Login',
                ip : req.headers['x-forwarded-for'] || req.connection.remoteAddress,
                username : result[0].username
            });
            res.status(200).json({accessToken: encoded,refreshToken: reEncoded,typeRole: 'agent',message :`agent => ${result[0].username} login OK !!`});
        }
    }
}
const registerAgent = async (req,res) => {
    const body = req.body;
    const datetime = dateTime.today();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
        return res.status(400).send({
            message: 'Invalid email format'
        })
    }
    let result = await sequelize.query('SELECT license_id FROM agent WHERE license_id = ? OR username = ? OR email = ?', {
        replacements: [body.license,body.username,body.email],
        type: QueryTypes.SELECT,
    });
    if (Object.keys(result).length){
        return res.status(400).send({message : `Have ${body.email} already !!`});
    }else{
        const numOTP = await getOTPNum(8)
        result = await db.Agent.create({
            license_id: body.license,
            username: body.username,
            password: bcryptjs.hashSync(body.conf_pass,bcryptjs.genSaltSync(12)),
            email: body.email,
            conf_email: bcryptjs.hashSync(numOTP,bcryptjs.genSaltSync(12)),
            company_name: body.company,
            tel: body.phone,
            pic_payment_path: req.files[0].originalname,
            update_date: datetime.normal
        });
        const confEncoded = await getConfirmToken(body.email);
        const status = await email.sender({receive: body.email,subject:'Lovetravels Verify OTP',message:`OTP : <b>${numOTP}</b>`});
        return status.error ? res.status(400).send({message : status.error}) : res.status(201).send({confirmToken:confEncoded,message: 'Register successfully !!'});
        //return res.status(201).send({confirmToken:confEncoded,message: 'Register successfully !!'})
        
    }
}
const profileAgent = async (req,res) => {
    const decodeToken = req.decodeToken;
    let result = await sequelize.query('SELECT license_id,username,email,company_name,tel,pic_payment_path FROM agent WHERE username = ? LIMIT ?', {
        replacements: [decodeToken.username,1],
        type: QueryTypes.SELECT,
    });
    result.forEach((v,i) => {
        result[i].picPath = `${req.protocol}://${req.get('host')}/qr_code/`+v.pic_payment_path;
    });
    res.status(200).send(result);
}
const changePasswordAgent = async (req,res) => {
    const reDecoded = req.decodeToken;
    const body = req.body;
    const datetime = dateTime.today();
    const result = await sequelize.query('SELECT username FROM agent WHERE username = ?', {
                replacements: [reDecoded.username],
                type: QueryTypes.SELECT,
            });
            if (!Object.keys(result).length){
                res.status(400).send({message :`agent not found !!`});
            }else{
                const encoded = await encryptToken.encoded({username: body.username,typeRole: 'agent'});
                const reEncoded = await encryptToken.reEncoded({username: body.username,typeRole: 'agent'});
                const update = await db.Agent.update({
                        username : body.username,
                        password : bcryptjs.hashSync(body.conf_pass,bcryptjs.genSaltSync(12)),
                        update_date : datetime.normal
                    },{
                        where: {username:result[0].username}
                    }).then(res => {return res}).catch(err => {return {error : err}});
                update.error ? res.status(400).send({message : update.error}) : await log.taskLog({
                            task : 'Changed password',
                            ip : req.headers['x-forwarded-for'] || req.connection.remoteAddress,
                            username : result[0].username
                        }); res.status(200).send({accessToken: encoded,refreshToken: reEncoded,typeRole: 'agent',message: 'Change password successfully !!'});
            }
} 
const editProfileAgent = async (req,res) => {
    const body = req.body;
    const decodeToken = req.decodeToken;
    const datetime = dateTime.today();
    const result= await sequelize.query('SELECT username,pic_payment_path FROM agent WHERE username = ? LIMIT ?', {
        replacements: [decodeToken.username,1],
        type: QueryTypes.SELECT,
    });
    if(result.parent){
        res.status(400).json({message : temp.parent.code});
    }else{
        const dataUpdate = {
                license_id : body.licenseId,
                company_name : body.company,
                email : body.email,
                tel : body.phone
            };
        req.files[0] ? dataUpdate.pic_payment_path = req.files[0].originalname : null; 
        const update = await db.Agent.update(dataUpdate,{
                where: {username:result[0].username}
            }).then(res => {return res}).catch(err => {return {error : err}});
        if(update.error){
            res.status(400).send({message : update.error});
        }else{
            if(req.files[0]){
                fs.unlink(path.join(__dirname, "../../../src/images/qrcode/"+result[0].pic_payment_path), (err) => {
                    if (err) {
                        console.error(`Error deleting the file ${result[0].pic_payment_path}:`, err);
                    }
                });
            }
            await log.taskLog({
                            task : 'Edit profile',
                            ip : req.headers['x-forwarded-for'] || req.connection.remoteAddress,
                            username : result[0].username
                        });
            res.status(200).send({message : 'Edit package tour successfully'});
        }
    }
}
const allTaskLog = async (req,res) => {
    const reDecoded = req.decodeToken;
    let result = await sequelize.query('SELECT * FROM agent_log WHERE username = ?', {
        replacements: [reDecoded.username],
        type: QueryTypes.SELECT,
    });
    if (!Object.keys(result).length){
        res.status(400).send({message :`agent log not found !!`});
    }else{
        res.status(200).send(result);
    }
} 
const confEmailAgent = async (req,res) => {
    const body = req.body;
    const reDecoded = req.decodeToken;
    const datetime = dateTime.today();
            const result = await sequelize.query('SELECT username,email,conf_email FROM agent WHERE email = ?', {
                replacements: [reDecoded.email],
                type: QueryTypes.SELECT,
            });
            if (!Object.keys(result).length){
                res.status(400).send({message :`agent not found !!`});
            }else{
            const dePass = bcryptjs.compareSync(body.otp,result[0].conf_email);
                if(!dePass){
                    res.status(400).send({message: "OTP is wrong !!"});
                }else{
                    const encoded = await encryptToken.encoded({username: result[0].username,typeRole: 'agent'});
                    const reEncoded = await encryptToken.reEncoded({username: result[0].username,typeRole: 'agent'});
                    const update = await db.Agent.update({
                        conf_email: body.otp,
                        update_date: datetime.normal,
                    },{
                        where: {email:result[0].email}
                    }).then(res => {return res}).catch(err => {return {error : err}});
                update.error ? res.status(400).send({message : update.error}) : await log.taskLog({
                            task : 'Login',
                            ip : req.headers['x-forwarded-for'] || req.connection.remoteAddress,
                            username : result[0].username
                        }); res.status(200).send({accessToken: encoded,refreshToken: reEncoded,typeRole: 'agent',message: 'Verify Email successfully !!'});
                }
            }
        }
const resendOTPAgent = async (req,res) => {
    const datetime = dateTime.today();
    const reDecoded = req.decodeToken;
            const numOTP = await getOTPNum(8);
            const confEncoded = await getConfirmToken(reDecoded.email);
            const status = await email.sender({receive: reDecoded.email,subject:'Lovetravels Verify OTP',message:`OTP : <b>${numOTP}</b>`});
            if(status.error){res.status(400).send({message : status.error})}else{
                const update = await db.Agent.update({
                        conf_email: bcryptjs.hashSync(numOTP,bcryptjs.genSaltSync(12)),
                        update_date: datetime.normal,
                    },{
                        where: {email:reDecoded.email}
                    }).then(res => {return res}).catch(err => {return {error : err}});
                update.error ? res.status(400).send({message : update.error}) : res.status(200).send({confirmToken:confEncoded,message: 'Resend OTP successfully !!'});
            }
        }
function getConfirmToken(UEmail){
    const confEncoded = encryptToken.reEncoded({email: UEmail,typeRole: 'pendding'});
    return confEncoded;
}
function getOTPNum(numLenght){
    let numOTP = "";
        for(let i = 0;i < numLenght;i++){
            numOTP = numOTP + (Math.floor(Math.random() * (9 - 1) + 1)).toString();
        }
    return numOTP;
}
module.exports = {
    loginAgent,
    registerAgent,
    profileAgent,
    changePasswordAgent,
    editProfileAgent,
    allTaskLog,
    confEmailAgent,
    resendOTPAgent
}
const db = require('../../../models');
const {sequelize,Sequelize} = require('../../../models');
const { QueryTypes } = require('sequelize');
const bcryptjs = require('bcryptjs');
const datetime = require('../datetime');
const encryptToken = require('../encrypt');
const email = require('../email')

const loginUser = async (req,res) => {
    const body = req.body;
    const result = await sequelize.query('SELECT * FROM member WHERE email = ?', {
        replacements: [body.email],
        type: QueryTypes.SELECT,
    });
    if (!Object.keys(result).length){
        res.status(400).json({message :`user not found !!`})
    }else if(result[0].conf_email.length !== 8){
            const confEncoded = await getConfirmToken(result[0].email)
            res.status(200).send({confirmToken : confEncoded,redirect : 'confirm_email'})
        }else{
        const dePass = bcryptjs.compareSync(body.pass,result[0].password);
        if(!dePass){
            res.status(400).send({message: "Username or Password is wrong !!"})
        }else{
            const encoded = await encryptToken.encoded({email: result[0].email,typeRole: 'member'})
            const reEncoded = await encryptToken.reEncoded({email: result[0].email,typeRole: 'member'})
            await db.Member.update({
                update_date: datetime.today()
            },{
                where: {uid:result[0].uid,email:result[0].email}
            })
            res.status(200).json({accessToken: encoded,refreshToken: reEncoded,typeRole: 'member',message :`user => ${result[0].email} login OK !!`})
        }
    }
};
const registerUser = async (req,res) => {
    const body = req.body;
    let result = await sequelize.query('SELECT uid FROM member WHERE email = ?', {
        replacements: [body.email],
        type: QueryTypes.SELECT,
    });
    if (Object.keys(result).length){
        return res.status(400).send({message : `Have ${body.email} already !!`})
    }else{
        const numOTP = await getOTPNum(8)
        result = await db.Member.create({
            email: body.email,
            password: bcryptjs.hashSync(body.conf_pass,bcryptjs.genSaltSync(12)),
            conf_email: bcryptjs.hashSync(numOTP,bcryptjs.genSaltSync(12)),
            update_date: datetime.today()
        });
        const confEncoded = await getConfirmToken(body.email)
        const status = await email.sender({receive: body.email,subject:'Lovetravels Verify OTP',message:`OTP : <b>${numOTP}</b>`})
        return status.error ? res.status(400).send({message : status.error}) : res.status(201).send({confirmToken:confEncoded,message: 'Register successfully !!'})
    }
}
const confEmailUser = async (req,res) => {
        const body = req.body
        const reDecoded = req.decodeToken
        const result = await sequelize.query('SELECT email,conf_email FROM member WHERE email = ?', {
                replacements: [reDecoded.email],
                type: QueryTypes.SELECT,
            });
            if (!Object.keys(result).length){
                res.status(400).send({message :`member not found !!`})
            }else{
            const dePass = bcryptjs.compareSync(body.otp,result[0].conf_email);
                if(!dePass){
                    res.status(400).send({message: "OTP is wrong !!"})
                }else{
                    const encoded = await encryptToken.encoded({email: result[0].email,typeRole: 'member'})
                    const reEncoded = await encryptToken.reEncoded({email: result[0].email,typeRole: 'member'})
                    const update = await db.Member.update({
                        conf_email: body.otp,
                        update_date: datetime.today(),
                    },{
                        where: {email:result[0].email}
                    }).then(res => {return res}).catch(err => {return {error : err}})
                update.error ? res.status(400).send({message : update.error}) : res.status(200).send({accessToken: encoded,refreshToken: reEncoded,typeRole: 'member',message: 'Verify Email successfully !!'})
                }
            }
    }
const resendOTPUser = async (req,res) => {
            const reDecoded = req.decodeToken
            const numOTP = await getOTPNum(8)
            const confEncoded = await getConfirmToken(reDecoded.email)
            const status = await email.sender({receive: reDecoded.email,subject:'Lovetravels Verify OTP',message:`OTP : <b>${numOTP}</b>`})
            if(status.error){res.status(400).send({message : status.error})}else{
                const update = await db.Member.update({
                        conf_email: bcryptjs.hashSync(numOTP,bcryptjs.genSaltSync(12)),
                        update_date: datetime.today(),
                    },{
                        where: {email:reDecoded.email}
                    }).then(res => {return res}).catch(err => {return {error : err}})
                update.error ? res.status(400).send({message : update.error}) : res.status(200).send({confirmToken:confEncoded,message: 'Resend OTP successfully !!'})
            }
        }
const authToken = async (req,res) => {
    const reDecoded = req.decodeToken
            let detailToken = {}
            if(reDecoded.typeRole === 'member'){
                detailToken = {email: reDecoded.email,typeRole: reDecoded.typeRole}
            }else if(reDecoded.typeRole === 'agent'){
                detailToken = {username: reDecoded.username,typeRole: reDecoded.typeRole}
            }
            const reEncoded = await encryptToken.reEncoded(detailToken)
            reEncoded.err ? res.status(400).send({message : reEncoded.err}) : res.status(200).send({refreshToken:reEncoded,typeRole:reDecoded.typeRole})
        }
function getConfirmToken(UEmail){
    const confEncoded = encryptToken.reEncoded({email: UEmail,typeRole: 'pendding'})
    return confEncoded
}
function getOTPNum(numLenght){
    let numOTP = ""
        for(let i = 0;i < numLenght;i++){
            numOTP = numOTP + (Math.floor(Math.random() * (9 - 1) + 1)).toString()
        }
    return numOTP
}
module.exports = {
    loginUser,
    registerUser,
    confEmailUser,
    resendOTPUser,
    authToken
};
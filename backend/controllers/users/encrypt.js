const jwt = require('jsonwebtoken');
const fs = require('fs');

const options = {expiresIn: '1h',algorithm: 'RS256'};
const reOptions = {expiresIn: '2h',algorithm: 'RS256'};

const encoded = async (payload) => {
    const privateKey = await fs.readFileSync('./src/encrypt/privateKey.key','utf-8');
    const token = jwt.sign(payload, privateKey, options);
    return token;
}
const decoded = async (token) => {
    const publicKey = await fs.readFileSync('./src/encrypt/publicKey.key','utf-8');
    const verified = jwt.verify(token,publicKey,options, (err, decoded) => { 
        if(err){
            return {err:err}
        }else{
            return decoded
        }
     } )
    return verified;
}
const reEncoded = async (payload) => {
    const privateKey = await fs.readFileSync('./src/encrypt/privateKeyRefresh.key','utf-8');
    const token = jwt.sign(payload, privateKey, reOptions);
    return token;
}
const reDecoded = async (token) => {
    const publicKey = await fs.readFileSync('./src/encrypt/publicKeyRefresh.key','utf-8');
    const verified = await jwt.verify(token,publicKey,reOptions, (err, decoded) => { 
        if(err){
            return {err:err}
        }else{
            return decoded
        }
     } )
     return verified
}
module.exports = {
    encoded,
    decoded,
    reEncoded,
    reDecoded
};
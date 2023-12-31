const jwt = require('jsonwebtoken');
const config = require('../config/config')
const verifyToken = (token) =>{
    console.log('config-->', config.get('jwtSecret'))

    // if(token){

    // }
    try{
        const decoded = jwt.verify(token.replace('Bearer ', ''), config.get('jwtSecret'));
        console.log('decoded token---->', decoded)

    }catch(error)   {
        console.log('error--->', error)
    }

    // console.log('decoded--->', decoded)
}

module.exports = {verifyToken}
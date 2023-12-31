const jwt = require('jsonwebtoken');
const config = require('../config/config')

const generateResponse = ()=>{

}

const verifyToken = (token,res) =>{
    console.log('config-->', config.get('jwtSecret'))

    if(token){
        try{
            const decoded = jwt.verify(token.replace('Bearer ', ''), config.get('jwtSecret'));
            console.log('decoded token---->', decoded)
            return decoded
    
        }catch(err)   {
            const error = err.toString()
            console.log('error--->', error.includes('jwt expired'))
            if(error.includes('jwt expired')){
                console.log('inside if')
                res.writeHead(401,{"Content-Type":"application/json"});
                console.log('after writeHead')
                res.end(JSON.stringify({statusCode:401, message:'token expired'}))
            }else{
                res.writeHead(401,{"Content-Type":"application/json"});
                res.end(JSON.stringify({statusCode:401, message:"Token is invalid"}))
            }
        }

    }
    else{
        res.writeHead(401, {"Content-Type":"application/json"})
        res.end({statuCode:401, message:"No token Found in request"})
    }
   

    // console.log('decoded--->', decoded)
}

module.exports = {verifyToken}
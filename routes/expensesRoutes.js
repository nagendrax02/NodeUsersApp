// const userControllers = require("../controllers/userController");
const expensesController = require("../controllers/expensesController")
// const { verifyToken } = require("../utils/verifyToken");



const jwt = require('jsonwebtoken');
const config = require('../config/config')

const generateResponse = ()=>{

}

const verifyToken = (token,res) =>{
    console.log('config-->', config.get('jwtSecret'))

    if(token){
        try{
            const decoded = jwt.verify(token.replace('Bearer ', ''), config.get('jwtSecret'));
            // console.log('decoded token---->', decoded)
            return {token:decoded, message: 'valid'}
    
        }catch(err)   {
            const error = err.toString()
            // console.log('error--->', error.includes('jwt expired'))
            if(error.includes('jwt expired')){
                // console.log('inside if')
                // res.writeHead(401,{"Content-Type":"application/json"});
                // console.log('after writeHead')
                // res.end(JSON.stringify({statusCode:401, message:'token expired'}))
                return {token: null, message: "expired"}
            }else{
                // res.writeHead(401,{"Content-Type":"application/json"});
                // res.end(JSON.stringify({statusCode:401, message:"Token is invalid"}))
                return {token: null, message: "invalid"}
            }
        }

    }
    else{
        // res.writeHead(401, {"Content-Type":"application/json"})
        // res.end({statuCode:401, message:"No token Found in request"})
        return {token: null, message: "empty"}
    }
   

    // console.log('decoded--->', decoded)
}

module.exports = {verifyToken}


const handleExpensesRoutes = (req, res) => {
console.log('expense routes called')
//   console.log('req---->', req.url)
  if (req.method === "POST" && req.url === "/create-expense") {

    console.log('inside if')


    const token = req.headers.authorization;
    const isTokenValid = verifyToken(token,res);
    if (isTokenValid.token !== null && isTokenValid.message === 'valid') {
        
        let data = "";
        console.log('data--->', data)
        req.on("data", (chunk) => {
          data += chunk;
        });
    
        req.on("end", () => {
            if(data){
          req.body = JSON.parse(data);
          expensesController.createExpenseController(req, res);
          return
            }
        res.writeHead(401, { "Content-Type": "text/plain" });
        res.end("Body data is empty");
        });
        return
    }
    else if(isTokenValid.token === null, isTokenValid.message === "expired") {
        // Handle other routes
        res.writeHead(401, { "Content-Type": "text/plain" });
        res.end("Token Expired");
        return
      }

      else if(isTokenValid.token === null, isTokenValid.message === "invalid") {
        // Handle other routes
        res.writeHead(401, { "Content-Type": "text/plain" });
        res.end("Token not valid");
        return
      }

      else if(isTokenValid.token === null, isTokenValid.message === "empty") {
        // Handle other routes
        res.writeHead(401, { "Content-Type": "text/plain" });
        res.end("Token is empty");
        return
      }
   
   
  } 

  if (req.method === "DELETE" && req.url === "/delete-expense") {
    const token = req.headers.authorization;
    const isTokenValid = verifyToken(token, res);
    if (isTokenValid.token !== null && isTokenValid.message === "valid") {
      let data = "";
      console.log("data--->", data);
      req.on("data", (chunk) => {
        data += chunk;
      });

      req.on("end", () => {
        if (data) {
          req.body = JSON.parse(data);
          expensesController.deleteExpenseController(req, res);
          return;
        }
        res.writeHead(401, { "Content-Type": "text/plain" });
        res.end("Body data is empty");
      });
      return
    } 

    else if(isTokenValid.token === null, isTokenValid.message === "expired") {
        // Handle other routes
        res.writeHead(401, { "Content-Type": "text/plain" });
        res.end("Token Expired");
        return
      }

      else if(isTokenValid.token === null, isTokenValid.message === "invalid") {
        // Handle other routes
        res.writeHead(401, { "Content-Type": "text/plain" });
        res.end("Token not valid");
        return
      }

      else if(isTokenValid.token === null, isTokenValid.message === "empty") {
        // Handle other routes
        res.writeHead(401, { "Content-Type": "text/plain" });
        res.end("Token is empty");
        return
      }
    
}



if (req.method === "GET" && req.url === "/fetch-expenses-list") {
    const token = req.headers.authorization;
    const isTokenValid = verifyToken(token, res);
    if (isTokenValid.token !== null && isTokenValid.message === "valid") {
      let data = "";
      console.log("data--->", data);
      req.on("data", (chunk) => {
        data += chunk;
      });

      req.on("end", () => {
        if (data) {
          req.body = JSON.parse(data);
          expensesController.getExpensesListExpenseController(req, res);
          return;
        }
        res.writeHead(401, { "Content-Type": "text/plain" });
        res.end("Body data is empty");
       
      });
      return
    } 

    else if(isTokenValid.token === null, isTokenValid.message === "expired") {
        // Handle other routes
        res.writeHead(401, { "Content-Type": "text/plain" });
        res.end("Token Expired");
        return
      }

      else if(isTokenValid.token === null, isTokenValid.message === "invalid") {
        // Handle other routes
        res.writeHead(401, { "Content-Type": "text/plain" });
        res.end("Token not valid");
        return
      }

      else if(isTokenValid.token === null, isTokenValid.message === "empty") {
        // Handle other routes
        res.writeHead(401, { "Content-Type": "text/plain" });
        res.end("Token is empty");
        return
      }
    
}





   else {
    // Handle other routes
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
};

module.exports = { handleExpensesRoutes };

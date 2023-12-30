const userControllers = require('../controllers/userController');

 const handleUserRoute = (req,res) => {
  if (req.method === "POST" && req.url === "/register") {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      req.body = JSON.parse(data);
      console.log('req.body--->', req.body)
      userControllers.createUserController(req, res);
    });
  }

  else if(req.method === "POST" && req.url === '/login'){
    let data =''
    req.on("data",(chunk)=>{
        data += chunk
    })


    req.on('end', ()=>{

        req.body = JSON.parse(data)
    console.log('req.body--->',req.body)

        userControllers.loginUserController(req,res)
    })
  }

  else if(req.method === 'GET' && req.url === '/users'){
    userControllers.fetchAllUsersController(req,res)
  }
  
  


  else {
    // Handle other routes
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
};

module.exports = {handleUserRoute};

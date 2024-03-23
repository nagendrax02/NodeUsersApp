const connectToMongo = require("../db/dbConnection");
const userModels = require("../models/userModel");

require('dotenv').config()

const isUserRegistered = async (res, email) => {
  // console.log('res email', res,email)
  const db = await connectToMongo();
  const RegisteredUsers = process.env.REGISTERED_USER_COLLECTION
  const isRegistered = await RegisteredUsers.findOne({ email });
  if (isRegistered) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        statusCode: "409",
        message: "User already Registered",
      })
    );
    return true;
  }

  return false;
};

async function createUserController(req, res) {
  const { username, email, password } = req.body;
  console.log("REQ----->", req.body)
  try {
    const isRegistered = await isUserRegistered(res, email);
    console.log('is registered--->', isRegistered)
    if (isRegistered) return;
    const newUser = await userModels.createUser(username, email, password);
    res.writeHead(200, { "Content-Type": "application/json" });

    res.end(
      JSON.stringify({
        statusCode: "200",
        user: newUser,
        message: "successfully created user",
      })
    );
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: error.message }));
  }
}

const loginUserController = async (req, res) => {
  const { email, password } = req.body;
  console.log('email, password', email,password)
  try {
    const user = await userModels.loginUser(email, password);

    console.log('user--->', user)
    if (user) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          statusCode: "200",
          user,
          message: "logged in successfully",
        })
      );
      return
    }
    if(!email){
      res.writeHead(400, {"Content-Type":"application/json"})
      res.end(JSON.stringify({StatusCode:400, message:"Email is required"}))
      return
    }
    if(!password){
      res.writeHead(400, {"Content-Type":"application/json"});
      res.end(JSON.stringify({statusCode:400, message:'Password Required'}))
    }
    res.writeHead(401,{"Content-Type":"application/json"})
    res.end(JSON.stringify({statusCode:401, message:"Invalid email or password"}))
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: error.message }));
  }
};

const fetchAllUsersController =async (req,res)=>{
  try{
    const users = await userModels.fetchAllUsers()
    res.writeHead(200, {"Content-Type":"application/json"})
    res.end(JSON.stringify({statusCode:200, data:users, message:' Fetched data successfully '}))
  }catch(error){
    res.writeHead(500, {"Content-Type":"application/json"})
    res.end(JSON.stringify({statusCode:500, message:error.message}))
  }

}

module.exports = { createUserController, loginUserController, fetchAllUsersController };

const connectToMongo = require("../db/dbConnection");
const userModels = require("../models/userModel");

const isUserRegistered = async (res, email) => {
  // console.log('res email', res,email)
  const db = await connectToMongo();
  const RegisteredUsers = db.collection("RegisteredUsers");
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
  try {
    const user = await userModels.loginUser(email, password);
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

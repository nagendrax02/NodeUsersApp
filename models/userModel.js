const { ObjectId } = require("mongodb");
const connectToMongo = require("../db/dbConnection");
const jwt = require("jsonwebtoken");



async function createUser(username, email, password) {
  const db = await connectToMongo();
  const userList = db.collection("RegisteredUsers");
  // Insert the user data into the 'users' collection

  const result = await userList.insertOne({ username, email, password });

  return {
    _id: result.insertedId,
    username,
    email,
    password,
  };
}


const loginUser=async(email, password)=>{
    const db = await connectToMongo();
    const userList = db.collection("RegisteredUsers")
    const user = await userList.findOne({email,password});
    if(user){
        const token = jwt.sign({ userId: user._id, email: user.email , username:user.username}, '&8n3m', {
            expiresIn: '1h', // Token expiration time (adjust as needed)
          });
        return token
    }
    return false
}


const fetchAllUsers = async ()=>{
    const db = await connectToMongo();
    const userList = db.collection("RegisteredUsers");
    const users = await userList.find({}).toArray()
    return users
}

module.exports ={ createUser,loginUser, fetchAllUsers};

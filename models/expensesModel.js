const { ObjectId } = require("mongodb");
const connectToMongo = require("../db/dbConnection");
const jwt = require("jsonwebtoken");
const config = require('../config/config')

require('dotenv').config()



async function createExpenses(userid, expenseName , expenseType, expendAmount) {
  const db = await connectToMongo();
  const expensesList = db.collection(process.env.EXPNESES_COLLECTION);
  // Insert the user data into the 'users' collection

  const result = await expensesList.insertOne({ userid, expenseName , expenseType, expendAmount});

  return {
    _id: result.insertedId,
    userid, 
    expenseName , 
    expenseType,
    expendAmount,
  };
}


async function deleteExpenses(userid, expenseId) {
    const db = await connectToMongo();
    const expensesList = db.collection(process.env.EXPNESES_COLLECTION);
    // Insert the user data into the 'users' collection
  
    const result = await expensesList.deleteOne({ userid, _id: expenseId});
  
    return {
      userid, 
     expenseId
    };
  }

  async function getExpensesList(userid) {
    const db = await connectToMongo();
    const expensesList = db.collection(process.env.EXPNESES_COLLECTION);
    // Insert the user data into the 'users' collection
  console.log('expenses-- list-->', expensesList)
    const result = await expensesList.find({ userid}).toArray();
  
    return {
    result
    };
  }




module.exports ={ createExpenses, deleteExpenses, getExpensesList}

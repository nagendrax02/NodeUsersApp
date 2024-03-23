const { MongoClient } = require("mongodb");
require('dotenv').config();

// ('dotenv--->', process('dotenv').config())

const url = process.env.BACKEND_URL
const dbName = process.env.DATABASE_NAME

console.log('url--->', url, dbName)

const connectToMongo = async () => {
  const client = new MongoClient(url);
  try {
    await client.connect();
    console.log('connected to mongodb')

    return client.db(dbName);
    // client.close()
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

module.exports = connectToMongo;

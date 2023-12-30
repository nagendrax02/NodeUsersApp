const { MongoClient } = require("mongodb");
const url =
  "mongodb+srv://nagendrax02:guruRawat@cluster0.cwywnos.mongodb.net/?retryWrites=true&w=majority";
const dbName = "UsersDatabase";

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

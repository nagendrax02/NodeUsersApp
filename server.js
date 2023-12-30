const http = require("http");

const connectToMongo = require("./db/dbConnection");
const userRoutes = require("./routes/userRoutes");



connectToMongo();

const findUser = () => {};

const server = http.createServer((req, res) => {
  userRoutes.handleUserRoute(req, res);
});

// Start the server
server.listen(3000, () => {
  console.log(`Server is running on http://localhost:${3000}`);
});

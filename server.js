const http = require("http");

const connectToMongo = require("./db/dbConnection");
const userRoutes = require("./routes/userRoutes");
const expenseRoutes = require("./routes/expensesRoutes")


connectToMongo();

const findUser = () => {};

const server = http.createServer((req, res) => {
  console.log('req.url-->', req.url)
  if(req.url === "/create-expense" || req.url === "/delete-expense" || req.url === "/fetch-expenses-list"){

    expenseRoutes.handleExpensesRoutes(req,res)
  }
  else if(req.url === '/register' || req.url === "/login"){
    // console.log('inside login')
    userRoutes.handleUserRoute(req, res);
  }
 
});

// Start the server
server.listen(3001, () => {
  console.log(`Server is running on http://localhost:${3001}`);
});

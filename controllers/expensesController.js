const connectToMongo = require("../db/dbConnection");
const expensesModel = require("../models/expensesModel");

// const isUserRegistered = async (res, email) => {
//   // console.log('res email', res,email)
//   const db = await connectToMongo();
//   const RegisteredUsers = db.collection("RegisteredUsers");
//   const isRegistered = await RegisteredUsers.findOne({ email });
//   if (isRegistered) {
//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.end(
//       JSON.stringify({
//         statusCode: "409",
//         message: "User already Registered",
//       })
//     );
//     return true;
//   }

//   return false;
// };

async function createExpenseController(req, res) {
  const { userid, expenseName , expenseType, expendAmount } = req.body;
  console.log("REQ----->", req.body)
  try {
    // const isRegistered = await isUserRegistered(res, email);
    // console.log('is registered--->', isRegistered)
    // if (isRegistered) return;

    console.log('inside try')
    
    const newExpense = await expensesModel.createExpenses(userid, expenseName , expenseType, expendAmount);
    res.writeHead(200, { "Content-Type": "application/json" });

    res.end(
      JSON.stringify({
        statusCode: "200",
        expense: newExpense,
        message: "successfully created expense",
      })
    );
   
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: error.message }));
  }
}

async function deleteExpenseController(req, res) {
    console.log('req.body-->', req.body)
    const { userid, expenseId } = req.body;
    try {
      // const isRegistered = await isUserRegistered(res, email);
      // console.log('is registered--->', isRegistered)
      // if (isRegistered) return;
      
      const deletedExpense = await expensesModel.deleteExpenses(userid, expenseId);
      console.log('deleted expense--->', deletedExpense)

      res.writeHead(200, { "Content-Type": "application/json" });
  
      res.end(
        JSON.stringify({
          statusCode: "200",
          deletedExpense: deletedExpense,
          message: "successfully deleted expense",
        })
      );
    } catch (error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: error.message }));
    }
  }


  async function getExpensesListExpenseController(req, res) {
    console.log('req.body-->', req.body)
    const { userid } = req.body;
    try {
      // const isRegistered = await isUserRegistered(res, email);
      // console.log('is registered--->', isRegistered)
      // if (isRegistered) return;
      
      const expensesList = await expensesModel.getExpensesList(userid);

      res.writeHead(200, { "Content-Type": "application/json" });
  
      res.end(
        JSON.stringify({
          statusCode: "200",
          expensesList: expensesList,
          message: "successfully fetched expenses List",
        })
      );
    } catch (error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: error.message }));
    }
  }



module.exports = { createExpenseController, deleteExpenseController, getExpensesListExpenseController };

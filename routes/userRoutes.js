const userControllers = require("../controllers/userController");
const { verifyToken } = require("../utils/verifyToken");

const handleUserRoute = (req, res) => {
  console.log('req---->', req)
  if (req.method === "POST" && req.url === "/register") {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      req.body = JSON.parse(data);
      userControllers.createUserController(req, res);
    });
  } else if (req.method === "POST" && req.url === "/login") {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      req.body = JSON.parse(data);

      userControllers.loginUserController(req, res);
    });
  } else if (req.method === "GET" && req.url === "/users") {
    const token = req.headers.authorization;
    console.log("token--->", token);
    const isTokenValid = verifyToken(token,res);
    if (isTokenValid) {
      userControllers.fetchAllUsersController(req, res);
    }
  } else {
    // Handle other routes
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
};

module.exports = { handleUserRoute };

const express = require("express");
const authrouter = express.Router();
const auth = require("../middleware/auth")

 const {login,register} =require("../Controller/userController");
 const {getme} =require("../Controller/getmeController");

authrouter.post("/login",login);
authrouter.post("/register",register);
authrouter.post("/me",auth,getme);

module.exports  = authrouter;
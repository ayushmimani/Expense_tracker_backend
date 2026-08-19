const express = require("express");

const authrouter = express.Router();

 const {register} =require("../Controller/userController");

// authrouter.post("/login",login);
// authrouter.post("/register",register);

module.exports  = authrouter;
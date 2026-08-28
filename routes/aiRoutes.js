const express = require("express");
const route = express.Router();
const auth = require("../middleware/auth")
const {getInsights} = require("../Controller/aiController");

route.post("/aifilter",auth,getInsights)


module.exports= route;
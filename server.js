require('dotenv').config();
const app = require("./app");
const connectDB = require('./config/db');
const PORT = process.env.PORT || 3000;


connectDB();

  app.listen(PORT, "127.0.0.1", () => {
  console.log("Raw server running on 3000");
});
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  console.log("hit");
  res.send("Test working");
});

app.listen(5000, "0.0.0.0", () => {
  console.log("Test server running on 5000");
});
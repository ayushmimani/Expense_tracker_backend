const express =require('express');
const cors =require('cors');

const ExpenseRouter = require("./routes/expenseRoutes")
const authrouter =require("./routes/userAuthRoutes");

const app =express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    console.log("hooo");
    
    res.send("Server is working1");
});
app.use((req,res,next)=>{
    console.log("express tracking is working");
    next();
})

app.use('/api/expense',ExpenseRouter);
app.use("/api/auth",authrouter)

module.exports = app
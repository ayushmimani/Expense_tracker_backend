const express =require('express');
const cors =require('cors');
const cookieParser = require('cookie-parser');
const ExpenseRouter = require("./routes/expenseRoutes")
const authrouter =require("./routes/userAuthRoutes");
const route =require("./routes/aiRoutes");

const app =express();

// app.use(cors());
// app.use(cors({
//   origin: 'http://localhost:5173', "https://expense-tacker-front.vercel.app/" 

//   credentials: true
// }));
app.use(cors({
  origin: [
    "http://localhost:5174",
   // "https://expense-tacker-front.vercel.app"
  ],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser())



app.get("/", (req, res) => {
    res.send("Server is working1");
});

app.use('/api/expense',ExpenseRouter);
app.use("/api/auth",authrouter)
app.use("/api/ai",route)

module.exports = app
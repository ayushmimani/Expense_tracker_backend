const express = require("express");
const auth = require("../middleware/auth")

const ExpenseRouter= express.Router();

const {
    CreateExpense,
    UpdateExpense,
    GetExpense,
    GetALlExpense,
    DeleteExpense,
    bulkupload
} = require('../Controller/expenseController')

ExpenseRouter.get('/',GetALlExpense);
ExpenseRouter.get('/:id',GetExpense);
ExpenseRouter.post('/',auth,CreateExpense);
ExpenseRouter.put('/:id',auth,UpdateExpense);
ExpenseRouter.delete('/',auth,DeleteExpense);
ExpenseRouter.post('/bulk',auth,bulkupload);


module.exports = ExpenseRouter;
const express = require('express');

const ExpenseRouter= express.Router();

const {
    CreateExpense,
    UpdateExpense,
    GetExpense,
    GetALlExpense,
    DeleteExpense
} = require('../Controller/expenseController')

ExpenseRouter.get('/',GetALlExpense);
ExpenseRouter.get('/:id',GetExpense);
ExpenseRouter.post('/',CreateExpense);
ExpenseRouter.put('/:id',UpdateExpense);
ExpenseRouter.delete('/:id',DeleteExpense);

module.exports = ExpenseRouter;
const { Timestamp } = require('bson');
const mongoose =require('mongoose');

const ExpenseModel = new mongoose.Schema({
    amount:{
        required:true,
        type:Number
    },
    category:{
        type:String,
        required:true
    },
    type:{
        enum:['debit','credit'],
        required:true,
        type:String
    },
    date:{
        type:Date,
        default:Date.now()
    }
},
  {timestamps:true}
)


module.exports =mongoose.model('Expense',ExpenseModel);
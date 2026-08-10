const expensemodel = require("../models/Expense");


// create
exports.CreateExpense =  async(req,res)=>{

    try{
            const data = req.body;

            const result = await expensemodel.create({
                amount: data.amount,
                category:data.category,
                type:data.type
            })           
            res.status(200).send("expesne added successfuly")
           
        }catch(error){
            res.status(400).send(error);
        }
}

        // update
exports.UpdateExpense = async(req,res)=>{
           
       try{
              const data =req.body;
            const  result = await expensemodel.findByIdAndUpdate(req.params.id,data,{returnDocument:"after"});

            if(result){
              res.status(200).send("record updated successfully");
            }else{
                  res.status(200).send("Thier is something issue");
            }
            }catch(error){
                res.status(500).send(error);
            }

}

        // get all
exports.GetALlExpense =async(req,res)=>{
           console.log("Get all expense API called");
            try{
                  const result =  await expensemodel.find();
                if(result){
                    res.status(200).send(result);
                }else{
                 res.status(400).send("Thier is something issue");
                }
                }catch(error){
                    res.status(500).send(error);
                }
        }

        // get 
 exports.GetExpense =async(req,res)=>{
           try{
                 
              const result =await expensemodel.findById(req.params.id);
              if(result){
                 res.status(200).send(result);
              }else{
                 res.status(400).send("Thier is something issue");
              }
                 
            }catch(error){
                res.status(500).send(error);
            }
        }

        // delete
 exports.DeleteExpense =async(req,res)=>{
    try{
    const result = await expensemodel.findByIdAndDelete(req.params.id)
    if(result){
        res.status(200).send("Deleted successfully");
    }else{
        res.status(400).send("Thier is something issue");
    }
    }catch(error){
        res.status(500).send(error);
    }
        }
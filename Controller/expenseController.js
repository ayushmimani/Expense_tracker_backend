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
            res.status(200).json({message:"expesne added successfuly",success:true,data:result})
           
        }catch(error){
           const message = "Error "+error
            res.status(200).json({message:message,success:false})
           
        }
}

        // update
exports.UpdateExpense = async(req,res)=>{
           
       try{
              const data =req.body;
            const  result = await expensemodel.findByIdAndUpdate(req.params.id,data,{returnDocument:"after"});

            if(result){
              res.status(200).json({message:"record updated successfully",success:true});
            }else{
                  res.status(400).json({message:"Something went wrong",success:false});
            }
            }catch(error){
                res.status(500).json({message:error,success:false});
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
    const {ids}= req.body;
    // Delete all documents whose _id exists inside this ids array $in  match any value inside this array
    const result = await expensemodel.deleteMany({_id:{$in : ids}})
    if(result){
        res.status(200).json(
          {
            mesage:"Deleted successfully",
            success:true
          }
    );
    }else{
        res.status(400).json(
             {
                mesage:"Expense not found",
                success:false
            }
        );
    }
    }catch(error){
        res.status(500).json(
             {
                mesage:"something went while deleting",
                success:false
            }
        );
    }
}

// bulk upload
exports.bulkupload =async (req,res)=>{
  try{

     const {bulkexpense} = req.body;
       console.log(bulkexpense);
       console.log("bulk upload node");
       
       
     if(!bulkexpense || bulkexpense.length==0){
       return res.status(400).json({
            success:false,
            message:"No data found to uplaod"
        })
     }

     const result = await expensemodel.insertMany(bulkexpense);
     if(result  && result.length > 0){
        res.status(201).json({
            success:true,
            message:"Bulk upload successfully",
            data:result
        })
     }else{
         res.status(400).json({
            success:false,
            message:"something error while bulk upload"
        })
     }
     
  }catch(error){
    res.status(500).json({
        message:error.message,
        success:false
    })
  }
} 
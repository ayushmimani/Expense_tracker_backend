const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");

const auth = async (req,res,next)=>{
    
    try {
         const {token}= req.cookies;
         if(!token){
             throw new Error("Token is missing");
         }

         const decodedid = await jwt.verify(token,process.env.SECRET_JWT);

         const {id} = decodedid
         console.log(id);
         
         const user = await UserModel.findById(id);
         if(!user){
            return res.status(400).json({
                status:false,
                data:{
                    message:"User not found"
                }
            })
         }

         req.user = user;
         next();


    } catch (error) {
        return  res.status(500).json({
            status:false,
            data:{
                message:"something went wrong "+error
            }
         })
    }
}

module.exports = auth;
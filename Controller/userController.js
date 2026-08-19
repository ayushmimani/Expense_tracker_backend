const UserModel = require("../models/User");
const generateToken =require("../utils/generateToken")

exports.login = async (req,res)=>{

try{
    const {email,password} = req.body;
 
    const user = await UserModel.findOne({email});
    if(!user || !(await user.matchpassword(password))) {
        return res.status(400).json({
           status:false,
          data:{
             message:"Invalid login credentials "
          }
        })
      }   


      return res.status(200).json({
          status:true,
          data:{
            id:user._id,
            email:user.email,
            token:generateToken(user._id)
          }
      })

    }
    catch(error){
        res.status(500).json({
            status:false,
            data:{
                message:"Something went wrong "+error
            }
        })
    }
   
}


exports.register = async(req,res)=>{


try{
    const {name,email,password,gender} = req.body;
    if(!name || !email || !password || !gender) return res.status(400).json({
        status:false,
        data:{
            message:"fields are required"
        }
    })

    const userExists  = await UserModel.findOne({email})
    if(userExists){
    return res.status(400).json({
        status:false,
        data:{
            message:"User already exist"
        }
    })
    }
console.log("before create");
    const user = await UserModel.create({
        name,email,password,gender
    })
console.log("after create");
    if(user){
         console.log("before token");
         const token=generateToken(user._id)
          console.log("after token");
        return res.status(200).json({
            status:true,
            data:{
                message:"useradded successfully",
                id:user._id,
                email:user.email,
                name:user.name,
                token,
            }
        })
    }

    }catch(error){
           return res.status(400).json({
             status:false,
                data:{
                    message:"somthing went wrong89 "+error
                }
          })
    }


}

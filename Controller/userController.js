const UserModel = require("../models/User");
const generateToken =require("../utils/generateToken")

exports.login = async (req,res)=>{

try{
    const {email,password} = req.body;
     
    const user = await UserModel.findOne({email});
    if(!user || !(await user.matchpassword(password))) {
        return res.status(400).json({
           status:false,
            message:"Invalid login credentials "
        })
      }   
      const accesstoken= generateToken(user._id);
      res.cookie('token',accesstoken,{
        httpOnly:true,
        sameSite: 'strict',
        maxAge: 24 * 60 *60*1000
      })

      return res.status(200).json({
          status:true,
         message:"Login successfully",
          data:{
            id:user._id,
            email:user.email,
            name:user.name
          }
      })

    }
    catch(error){
        res.status(500).json({
            status:false,
            message:"Something went wrong , Please try again"
        })
    }
   
}


exports.register = async(req,res)=>{


try{
    const {name,email,password,gender} = req.body;
    if(!name || !email || !password || !gender) return res.status(400).json({
        status:false,
         message:"fields are required"
    })

    const userExists  = await UserModel.findOne({email})
    if(userExists){
    return res.status(400).json({
        status:false,
          message:"User already exist"
    })
    }

    const user = await UserModel.create({
        name,email,password,gender
    })

    if(user){
        
         const token=generateToken(user._id)
          console.log("after token");
        return res.status(200).json({
            status:true,
              message:"user added successfully",
            data:{
                id:user._id,
                email:user.email,
                name:user.name,
            }
        })
    }

    }catch(error){
           return res.status(400).json({
             status:false,
                data:{
                    message:"somthing went wrong "+error
                }
          })
    }


}

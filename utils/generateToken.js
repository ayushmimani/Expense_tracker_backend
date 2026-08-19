// import jwt from "jsonwebtoken"

const jwt  =require("jsonwebtoken")

const generateToken = async(userid)=>{
    return  await jwt.sign({id:userid},process.env.SECRET_JWT,{
        expiresIn:'1d'
    });
}

module.exports = generateToken
//export default generateToken
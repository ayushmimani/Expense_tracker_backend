// import jwt from "jsonwebtoken"

const jwt  =require("jsonwebtoken")

const generateToken = (userid)=>{
if (!process.env.SECRET_JWT) {
    throw new Error("SECRET_JWT is not defined in environment variables");
  }
    return   jwt.sign({id:userid},process.env.SECRET_JWT,{
        expiresIn:'1d'
    });
}

module.exports = generateToken
//export default generateToken
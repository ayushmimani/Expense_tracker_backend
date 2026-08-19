import jwt from "jsonwebtoken"


const generateToken = async(userid)=>{
    return token = await jwt.sign({id:userid},process.env.SECRET_JWT,{
        expiresIn:'1d'
    });
}

export default generateToken
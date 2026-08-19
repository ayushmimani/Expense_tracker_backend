const {mongoose } = require("mongoose");
const bcrypt = require("bcrypt");


const UserModel = new mongoose.Schema({
  
    name:{
        type:String,
        required:true,
        min:6
    },
    email:{
        type:String,
        unique:true,
        reqiored:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    gender:{
        type:String,
        required:true,
        enum:['male','female','other']
    }
    
},{timestamps:true})


// before save it is run that funciton or check if password not modified than not excecute further becasue existing hash again hah 
// and user cant login ifnew password than hash
 UserModel.pre('save',async function(next){
    if(!this.iModified(this.password)) return next();

    const salt = await bcrypt.genSalt(10);
     this.password = await bcrypt(this.password,salt);
     return next();

 })

 UserModel.methods.matchpassword = async function(enteredpassword){
    return await bcrypt.compare(enteredpassword,this.password);
 }


module.exports = mongoose.model('user', UserModel);
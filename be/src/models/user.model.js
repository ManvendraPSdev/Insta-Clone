const mongoose = require("mongoose") ; 

const userSchema = new mongoose.Schema({
    userName : {
        type : String , 
        unique : [true , "User name already exists"] , 
        required : [true , "User name is require"]
    } , 
    email  : {
        type : String ,
        unique : [true,  "Email already exist"],
        required : [true , "Email is required"]
    },
    password : {
        type : String ,
        require : [true , "password is rquired"], 
        select : false  // we don't want to read the password from the data base 
    },
    bio : String ,
    profileImage : {
        type : String , 
        default : "https://res.cloudinary.com/dg7uxga98/image/upload/v1765713574/uploads/1765713571035-newImg.jpg.png"
    }
})

const userModel =  mongoose.model("users" , userSchema)

module.exports = userModel ; 
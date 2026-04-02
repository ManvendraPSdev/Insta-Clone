const mongoose = require("mongoose") ; 

const postSchema = new mongoose.Schema({
    caption : {
        type : String , 
        default  : ""
    },
    imgUrl : {
        type : String ,
        required : [true , "Img url is required to create the post"]
    },
    user : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : "users", 
        required : [true , "userid is required to create a post"]
    }
})

const postModel = mongoose.model("posts" , postSchema)

module.exports = postModel ;
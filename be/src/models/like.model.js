const mongoose = require("mongooose") ; 
const userModel = require("./user.model");
const { applyTimestamps } = require("./post.model");

const likeSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : "users" , 
        required : [true , "having a user is requried to like a post"]
    } , 
    post : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : "post" ,
        required : [true , "to like a post a post must be there"]
    }
} , {
    timestamps : true
})

likeSchema.index({post : 1 , user : 1} , {unique : true})

const likeModel = mongoose.model("likes" , likeSchema) ; 

module.exports = likeModel ; 
const express = require("express") ; 
const userModel = require("../models/user.model");
// const crypto = require("crypto") ; 
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken") ; 


async function registerController(req , res){
    console.log("BODY:", req.body);
    const {userName , email , password , bio , profileImage} = req.body ; 

    // const isUserExistsByEmail = await userModel.findOne({email}) ; 

    // if(isUserExistsByEmail){
    //     return res.status(409).json({
    //         meaage : "User already exists with same email"
    //     }) ; 
    // }

    // const isUserExistsByUserName = await userModel.findOne({userName}) ;

    // if(isUserExistsByUserName){
    //     return res.status(409).json({
    //         message : "User Already exists with same userName"
    //     })
    // }

    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            {userName} , 
            {email}
        ]
    })
    if(isUserAlreadyExists){
        return res.status(409).json({
            message : "User already exists "+(isUserAlreadyExists.email == email ? "Email already exists" : "UserName already exists")
        })
    }

    const hash = await bcrypt.hash(password , 10) ;

    const user = await userModel.create({
        userName,
        email , 
        bio ,
        profileImage ,
        password : hash
    })

    const token = jwt.sign({
        id : user._id , 
        name  : user.userName
    }, process.env.JWT_SECRET,{expiresIn : "1d"})

    res.cookie("token" , token)

    res.status(201).json({
        message : "User Registered Sucessfully", 
        user : {
            email : user.email , 
            userName : user.userName,
            bio : user.bio , 
            profileImage : user.profileImage
        }
    })

}

async function loginController(req , res){
    const {userName , email , password} = req.body ; 
    const user = await userModel.findOne({
        $or : [
            {
                userName : userName
            },
            {
                email : email
            }
        ]
    }).select("+password") // this querry forces the property to get read which is explicitly not allowed to get read; 
    if(!user ){
        return res.status(404).json({
            message : "User Not Found !"
        })
    }
    const isPasswordValid = await bcrypt.compare(password , user.password ) ;

    if(!isPasswordValid){
        return res.status(401).json({
            message : "Invalid Password !"
        })
    }

    const token = jwt.sign(
        {
            id : user._id , 
            name : user.userName
        } ,
        process.env.JWT_SECRET,
        {expiresIn : "1d"}
    )
    res.cookie("token" , token) ; 
    res.status(200).json({
        message : "User LoggedIn sucessfully" , 
        user : {
            userName : user.userName , 
            email : user.email , 
            bio : user.bio , 
            profileImage : user.profileImage
        }
    })
}

async function myProfile(req , res){
    const userId = req.user.id ; 

    const user = await userModel.findById(userId) ; 
    
    return res.status(200).json({
        message : "Profile Fetched Sucessfully" , 
        user : {
            username : user.userName , 
            email : user.email , 
            bio : user.bio , 
            profileImage : user.profileImage 
        }
    })
}

module.exports = {registerController , loginController , myProfile}
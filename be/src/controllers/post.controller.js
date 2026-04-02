const express = require("express");
const postModel = require("../models/post.model.js");
const ImageKit = require('@imagekit/nodejs');
const { toFile } = require('@imagekit/nodejs');
const jwt = require("jsonwebtoken");


const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

async function createPostController(req, res) {
    console.log("Post:", req.body, req.file)

    // const token = req.cookies.token;

    // if (!token) {
    //     return res.status(401).json({
    //         message: "Token not provided , Unauthorized Acess"
    //     })
    // }


    // let decoded = null ; 
    // try {
    //     decoded = jwt.verify(token, process.env.JWT_SECRET);
    // } catch (error) {
    //     return res.status(401).json({
    //         message: "Invalid Token !"
    //     })
    // }

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test",
    });
    res.send(file)

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: req.user.id 
    })

    await post.populate("user");

    return res.status(201).json({
        message: "Post created sucessfully !",
        post
    })
}

async function getPostController(req , res){
    // const token = req.cookies.token ; 
    // let decoded = null ; 
    // try {
    //     decoded = jwt.verify(token , process.env.JWT_SECRET) ; 
    // } catch (error) {
    //     return res.status(401).json({
    //         message : "Unauthorized token !"
    //     })
    // }
    const userId = req.user.id ; 
    const posts = await postModel.find({
        user : userId , 
    })

    return res.status(200).json({
        message : "Post fetched sucessfully !" , 
        posts
    })

}

async function getPostDetails(req , res){
   
    const userId = req.user.id ;  
    const postId =  req.params.postId ; 

    const post = await postModel.findById(postId) ; 

    if(!post){
        return res.status(404).json({
            message : "Post not found !"
        })
    }

    const isValidUser = post.user.toString() === userId ; 
    if(!isValidUser){
        return res.status(403).json({
            message: "Forbidden Content"
        })
    }

    return res.status(200).json({
        message: "Post Fetched sucessfully" , 
        post  
    })
}

async function likePostController(req , res){
    const userName = req.user.username ;  
    const postId = req.params.postId ; 

    const isPostExists = await postModel.findById(postId) ; 
    if(!isPostExists){
        res.status(404).json({
            message : "Post not found !"
        })
    }
    const like = await likeModel.create({
        post : postId , 
        user : userName
    })
    res.status(200).json({
        message : "post liked sucessfully" , 
        like 
    })
}

async function getFeedController(req , res){
     // for our feed section we just need all the post present in the DB
    const posts = await postModel.find().populate("user") ; 
    res.status(200).json({
        message : "posts fetched sucessfully",
        posts
    })
}

module.exports = { createPostController , getPostController , getPostDetails , likePostController , getFeedController};
const followModel = require("../models/follow.model.js");
const userModel = require("../models/user.model.js") ; 

async function followUserController(req , res){
    // which user is requesting to follow
    const followerUserName = req.user.username ; 

    const followeeUserName = req.params.username ; 

    if(followeeUserName === followerUserName){
        res.status(400).json({
            message : "You cannot follow yourself"
        })
    }

    const isFolloweeExists = await userModel.findOne({
        userName : followeeUserName
    })

    if(!isFolloweeExists){
        res.status(404).json({
            message : `User ${followeeUserName} not found !`
        })
    }

    const isAlreadyFollowing = await followModel.findOne({
        follower : followerUserName , 
        followee : followeeUserName
    })

    if(isAlreadyFollowing){
        res.status(200).json({
            message : `You are already following ${followeeUserName}` , 
            follow : isAlreadyFollowing
        })
    }

    const followRecord = await followModel.create({
        follower : followerUserName , 
        followee : followeeUserName  
    })

    res.status(201).json({
        message : `You are now following ${followeeUserName}` , 
        follow : followRecord 
    })
}

async function unfollowController(req , res){
    const follower = req.user.username ; 

    // targer user to unfollow 
    const followee = req.params.username ; 

    const isUserFollowing = await followModel.findOne({
        follower : follower ,
        followee : followee
    })

    if(!isUserFollowing){
        res.status(200).json({
            message : `You are not following user ${followee}`
        })
    }
    await followModel.findByIdAndDelete(isUserFollowing._id) ; 
    res.status(200).json({
        message:  `You have unfollow ${followee}`
    })
}

module.exports = {followUserController , unfollowController} ; 
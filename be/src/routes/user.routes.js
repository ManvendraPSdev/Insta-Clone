const express = require("express") ; 
const userRouter = express.Router() ; 
const userController = require("../controllers/user.controllers.js") ; 
const identifyUser = require("../middlewares/auth.middleware.js")

userRouter.post("/follow/:username" , identifyUser , userController.followUserController)
userRouter.post("/follow/:username" , identifyUser , userController.unfollowController)

module.exports = userRouter ; 
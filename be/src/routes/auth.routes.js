const express = require("express") ; 
const authRouter = express.Router() ;  
const authController = require("../controllers/auth.controllers.js");
const identifyingUser = require("../middlewares/auth.middleware.js");

authRouter.post("/register" , authController.registerController)

authRouter.post("/login" , authController.loginController)

authRouter.get("/get-me" , identifyingUser , authController.myProfile) ; 

module.exports = authRouter 
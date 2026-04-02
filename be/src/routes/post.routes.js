const express = require("express") ; 
const postRouter = express.Router() ; 
const postController = require("../controllers/post.controller.js") ;
const multer = require("multer") ; 
const upload = multer({storage:multer.memoryStorage()}) ;
const identifyingUser = require("../middlewares/auth.middleware.js")

postRouter.post("/" , upload.single("image") , identifyingUser , postController.createPostController) ;

postRouter.get("/" , identifyingUser , postController.getPostController) ; 

postRouter.get("/details/:postId" , identifyingUser , postController.getPostDetails) ; 

postRouter.post("/like/:postId" , identifyingUser , postController.likePostController) ; 

postRouter.get("/feed" , identifyingUser , postController.getFeedController) ; 

module.exports = postRouter ;
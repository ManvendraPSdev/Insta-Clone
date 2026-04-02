const jwt = require('jsonwebtoken') ; 

async function identifyingUser(req , res , next){
    const token = req.cookies.token ; 

    if(!token){
        return res.status(401).json({
            message : "Unauthorised Acess !"
        })
    }

    let decoded = null ; 
    try {
        decoded  = jwt.verify(token , process.env.JWT_SECRET) ; 
    } catch (error) {
        return res.status(401).json({
            message : "Invalid Token !"
        })
    } 

    req.user  = {
        id : decoded.id
    } ;  
    next() ; // middleware
}

module.exports = identifyingUser ;  
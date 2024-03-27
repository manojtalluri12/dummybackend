//const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
module.exports.middleware=(req,res,next)=>{
    try {
        let token=req.header('x-token');
        if(!token){
            return res.status(400).json({message:"without login not able see"})
        }
        let decode=jwt.verify(token,'jwt')
        req.user=decode.user
        next()
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"server error"})
    }
}
const jwt=require("jsonwebtoken");
const User=require("../models/userSchema");

const authenticate=async(req,res,next)=>{
  try{
    console.log("cookies",req.cookies);
    const token=req.cookies.jwt;
    const verifyToken=jwt.verify(token,process.env.SECRET_KEY);
    console.log("verifyToken"+verifyToken);
    const rootUser=await User.findOne({_id:verifyToken._id,"tokens.token":token});
    console.log("rootUser"+rootUser);
    if(!rootUser){
      throw new Error("User not found");
    }
    req.token=token;
    req.rootUser=rootUser;
    req.userID=rootUser._id;
    next();
  }
  catch(err){
    res.status(401).send("Unauthorized : No token provided");
    console.log(err);
  }
}
module.exports=authenticate;
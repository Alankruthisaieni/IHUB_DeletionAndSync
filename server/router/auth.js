// const cookieParser =require('cookie-parser');
const express=require("express");
var MongoClient = require('mongodb').MongoClient;
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
//////////////
const spawn = require('child_process').spawn;
const multer = require('multer');
const uuidv4 = require('uuid');
const router=express.Router();
require("../db/conn");
const User=require("../models/userSchema");
const authenticate=require("../middleware/authenticate");
const cookieParser = require('cookie-parser');
var fs = require('fs');
const { timeStamp } = require("console");
router.use(cookieParser());
router.get('/',(req,res)=>{
  res.setHeader("Access-Control-Allow-Origin", "*")
res.setHeader("Access-Control-Allow-Credentials", "true");
res.setHeader("Access-Control-Max-Age", "1800");
res.setHeader("Access-Control-Allow-Headers", "content-type");
res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
  res.send("Hello World router");
});
//using promises
// router.post('/register',(req,res)=>{
//   const {name, gender ,Address,phone,email}=req.body;
//   if(!name|| !gender || !Address || !phone || !email){
//     return res.status(422).json({error:"Plz fill all the fields properly"});
//   }
//   User.findOne({email:email})
//   .then((userExist)=>{
//     if(userExist){
//       return res.status(422).json({error:"Email already exists!"});
//     }
//     const user=new User({name, gender ,Address,phone,email});
//     user.save().then(()=>{
//       res.status(201).json({message:"User registered successfully"});
//     }).catch((err)=>{
//       res.status(500).json({error:"Failed to register"});
//     })
//   })
//   .catch((err)=>{
//     console.log(err);
//   })

// })
const DIR = './public/uploads/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname;
        cb(null, fileName)
    }
});
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});
MongoClient.connect("mongodb+srv://sathwika:sathwika@cluster0.gy7pm.mongodb.net/?retryWrites=true&w=majority", function(err, db) {
  if(!err) {
    console.log("We are connected");
  }
});
// MongoClient.connect("mongodb+srv://sathwika:sathwika@cluster0.gy7pm.mongodb.net/?retryWrites=true&w=majority", function(err, db) {
//   if (err) throw err;
//   console.log("Hello");
//   var dbo = db.db("Registration");
//   dbo.collection("users").findOne({"name":"Charitha"}, function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//   });
//   dbo.collection("users").find();
// });
//using async and await
var dateval;
const addDetails=async (req,res)=>{
  console.log(req.body);
  const name=req.body.name;
  const gender=req.body.gender;
  const dob=req.body.dob;
  const age=req.body.age;
  const address=req.body.address;
  const phone=req.body.phone;
  const email=req.body.email;
  const password=req.body.password;
  const profileImg=req.file.originalname;
  console.log("profileimg",profileImg);
  if(!name|| !gender|| !dob || !age || !address || !phone || !email|| !password|| !profileImg){
    console.log("Plz fill all the fields properly");
    return res.status(422).json({error:"Plz fill all the fields properly"});
  }
  const user=new User({name, gender,dob,age ,address,phone,email,password,profileImg});
  console.log("jjj"+user['timestamp']);
  dateval=user['timestamp'];
//   MongoClient.connect("mongodb+srv://sathwika:sathwika@cluster0.gy7pm.mongodb.net/?retryWrites=true&w=majority", function(err, db) {
//   if (err) throw err;
//   console.log("Hello");
//   var dbo = db.db("Registration");
//   dbo.collection("users").findOne({"timestamp":new Date("2022-05-20T16:53:02.485+00:00")}, function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//   });
//   dbo.collection("users").find();
// });
  try{
    const userExist=await User.findOne({email:email,name:name,dob:dob,phone:phone});
    const user1=await User.findOne({email:email});
    const user2=await User.findOne({name:name});
    const user3=await User.findOne({dob:dob});
    const user4=await User.findOne({phone:phone});
    console.log("Hello"+2+user.toString());
    
    console.log("user"+userExist);
    if(userExist){
      console.log("Duplicates not allowed!");
      // window.alert("Duplicates not allowed!")
      return res.status(422).json({error:"Duplicates not allowed!"});
    }
    else if(user1 || user2 ||user3||user4){
      //excel sheet
      var writeStream = fs.createWriteStream("file.txt");
      var header="User"+"\t"+"User1"+"\t"+" User2"+"\t"+"User3"+"\t"+"User4"+"\n";
      var pers=user==null?"null":user.toString();
      var pers1=user1==null?"null":user1.toString();
      var pers2=user2==null?"null":user2.toString();
      var pers3=user3==null?"null":user3.toString();
      var pers4=user4==null?"null":user4.toString();
      console.log(pers3);
      // var row1 = " "+pers+" "+"\t"+" "+pers1+" "+"\t"+" "+pers2+" "+"\t"+" "+pers3+" "+"\t"+" "+pers4+" "+"\n";
      var actual="Actual inputted data\n";
      var row1 =pers+"\n";
      var match="Matching data\n";
      var row2 =pers1+"\n"+pers2+"\n"+pers3+"\n"+pers4+"\n";
      // writeStream.write(header);
      writeStream.write(actual);
      writeStream.write(row1);
      writeStream.write(match);
      writeStream.write(row2);
      writeStream.close();
      return res.status(422).json({error:"Duplicates not allowed!"});
    }
    else{
      
      const save=await user.save();
      MongoClient.connect("mongodb+srv://sathwika:sathwika@cluster0.gy7pm.mongodb.net/?retryWrites=true&w=majority", function(err, db) {
        if (err) throw err;
        console.log("Hello");
        var dbo = db.db("Registration");
        dbo.collection("users").findOne({"timestamp":new Date("2022-05-20T16:53:02.485+00:00")}, function(err, result) {
          if (err) throw err;
          console.log(result);
          db.close();
        });
        //dbo.collection("users").find();
      });
      if(save){
        res.status(201).json({message:"User registered successfully"});
      }
      else{
        res.status(500).json({error:"Failed to register"});
      }
    }
  }
  catch(err){
    console.log(err);
  }
  console.log("dateval"+dateval);
};
router.post('/register', upload.single('profileImg'),addDetails);
router.get('/syncButton', function(req, res) {
  // Call your python script here.
  // I prefer using spawn from the child process module instead of the Python shell
  const process = spawn('python', ['router/connect.py']);
  // console.log(process);
  process.stdout.on('data', (myData) => {
      // Do whatever you want with the returned data.
      // ...
      res.send("Done!")
  })
  process.stderr.on('data', (myErr) => {
      // If anything gets written to stderr, it'll be in the myErr variable
  })
  // res.status(200).send("user Sync");
  // if(spawn('python', ['connect.py'])){
  //   res.status(200).send("user Sync");
  // }
})
//login route
router.post('/login',async(req,res)=>{
  try{
    const {email,password}=req.body;
    if(!email || !password){
      return res.status(400).json({"error":"Plz fill all the fields"});
    }
    const userLogin=await User.findOne({email:email});
    console.log(userLogin);
    if(userLogin){
      const isMatch=await bcrypt.compare(password,userLogin.password);
      // console.log(isMatch);
      
      if(isMatch){
        const token=await userLogin.generateAuthToken();
        console.log(token);
        res.cookie("jwt",token,{
          expires:new Date(Date.now()+25892000000),
          httpOnly:true
        });
         res.json ({"message":"user login succesfully"});
         
      }
      else{
         res.status(400).json({"error":"Invalid Credentials pass"});
      }
    }
    else{
      res.status(400).json ({"error":"Invalid Credentials user"});
    }

  }
  catch(err){
    console.log(err);
  }
})
// router.use(cookieParser());
router.get('/about',authenticate,(req,res)=>{
  
  res.send(req.rootUser);
});
router.get('/logout',(req,res)=>{
  console.log("My logout page");
  res.clearCookie('jwt',{path:'/'})
  res.status(200).send("user logout");
})
module.exports=router;
const dotenv=require("dotenv");
const express=require("express");
const mongoose=require("mongoose");
const app=express();
const bodyParser = require('body-parser')
dotenv.config({path:'./config.env'});
require("./db/conn")
const User=require('./models/userSchema');
const PORT=process.env.PORT || 5000;
app.use(express.json());//telling that object is of json type to browser
app.use(require('./router/auth'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use('/public/uploads', express.static('public/uploads'));
// const cookieParser = requires('cookie-parser'); 
// const bodyParser = require("body-parser");
// app.get('/',(req,res)=>{
//   res.send("Hello World");
// });
// app.get('/home',(req,res)=>{
//   res.send("Hello World");
// });
// app.get('/about',middleware,(req,res)=>{
//   res.send("Hello about World");
  
//   console.log("Hello about World");
// });
// app.get('/contact',(req,res)=>{
//   res.cookie("about","thapa");
//   res.send("Hello contact World");
// });
// app.get('/register',(req,res)=>{
//   res.send("Hello register World");
// });
// app.get('/login',(req,res)=>{
//   res.send("Hello login World");
// });
// app.use(bodyParser.urlencoded({extended:true}))
// app.use(bodyParser.json())
// app.use(cookieParser());
app.listen(PORT,()=>{
  console.log(`app is running at port number ${PORT}`);
})
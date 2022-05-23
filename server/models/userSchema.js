const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const userSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  gender:{
    type:String,
    required:true
  },
  dob:{
    type:Date,
    required:true
  },
  age:{
    type:Number,
    required:true
  },
  address:{
    type:String,
    required:true
  },
  phone:{
    type:Number,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  profileImg: {
    type: String,
    required:true
},
  timestamp:{
    type:Date,
    default:Date.now(),
    expires: 30
  },
  tokens:[
    {
      token:{
        type:String,
        required:true
      }
    }
  ]
})
userSchema.index({ "timestamp": 1 }, { expireAfterSeconds: 60 });
// console.log("Info"+userSchema["timestamp"]);

userSchema.pre("save",async function(next){
  if(this.isModified("password")){
    this.password=await bcrypt.hash(this.password,12)//12 is count
  }
  next();
})
//console.log(mongoose.connection.db.collection('users').find());
//console.log(mongoose);
userSchema.methods.generateAuthToken=async function(){
  try{
    let token=jwt.sign({_id:this._id},process.env.SECRET_KEY);
    this.tokens=this.tokens.concat({token:token});
    await this.save();
    return token;
  }
  catch(err){
    console.log(err);
  }
  
}

const User=mongoose.model('USER',userSchema);
//console.log("AA"+User);
module.exports=User;
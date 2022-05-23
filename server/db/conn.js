const mongoose=require("mongoose");
// var MongoClient = require('mongodb').MongoClient;
const DB=process.env.DATABASE;
mongoose.connect(DB).then(()=>{
  console.log(`Connection successful`);
}).catch((err)=>{
  console.log(`no connection `);
})
// MongoClient.connect("mongodb+srv://sathwika:sathwika@cluster0.gy7pm.mongodb.net/?retryWrites=true&w=majority", function(err, db) {
//   if(!err) {
//     console.log("We are connected");
//   }
// });
// MongoClient.connect("mongodb+srv://sathwika:sathwika@cluster0.gy7pm.mongodb.net/?retryWrites=true&w=majority", function(err, db) {
//   if (err) throw err;
//   console.log("Hello");
//   var dbo = db.db("Registration");
//   dbo.collection("users").findOne({"name":"charitha"}, function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//   });
//   dbo.collection("users").find();
// });
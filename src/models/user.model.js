const mongoose = require("mongoose")

 // ************** userSchema *************
 const userSchema = new mongoose.Schema({
    first_name: {type: String , required :true },
    last_name : {type : String , required : false },
    email: {type :String , required : true },
    gender :{type: String , required: false , default: "male"},
    age :{type : String , required: true }
},{
  versionKey : false,
  timestamps : true 
})

module.exports = mongoose.model("user",userSchema)
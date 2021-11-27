const mongoose = require("mongoose")


// *************   tag Schema ************

const tagSchema  = mongoose.Schema({
    name :{type : String , required : true },

},{
    versionKey : false ,
    timestamps : true ,
})

module.exports = new mongoose.model("tag", tagSchema )
const express  = require("express")
const mongoose = require("mongoose")



 const connect =()=>{
      return mongoose.connect(" mongodb://127.0.0.1:27017")
 }

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

 const User = mongoose.model("user",userSchema)

// ************ post Schema ************

const postSchema = new mongoose.Schema (
    {
    title :{type : String , required: true },
    body :{type : String , required : true },
    user_id :{
        type: mongoose.Schema.Types.ObjectId,
        ref : "user",
        required: true ,
    },
    tag_id :[{
        type : mongoose.Schema.Types.ObjectId,
        ref: "tag",
        required : true ,
    }]
},{
    versionKey : false ,
    timestamps : true ,
})


const Post = mongoose.model("post", postSchema)

// ************ comment Schema *************

const commentSchema =new  mongoose.Schema({
        body: {type: String , required: true },
        user_id :{
            type : mongoose.Schema.Types.ObjectId,
            ref : "user",
            required: true ,
        },
        post_id :[{
            type :  mongoose.Schema.Types.ObjectId,
            ref : "post",
            required: true ,
        }]
},{
    versionKey : false ,
    timestamps : true ,
})

const Comment  =   mongoose.model("comment", commentSchema )

// *************   tag Schema ************

const tagSchema  = mongoose.Schema({
    name :{type : String , required : true },

},{
    versionKey : false ,
    timestamps : true ,
})

const Tag = new mongoose.model("tag", tagSchema )


// **************** 

 const app = express()
 app.use(express.json())



 // **************** user CRUD ***************
 app.post("/users", async(req,res)=>{
     try{
      const user =  await User.create(req.body)
      return res.status(201).send(user)
     }catch(e){
       return res.status(500).json({message :e.message , status:"failed"})
     }
 })

 app.get("/", async(req,res)=>{
     try{
     const user = await User.find().lean().exec()
     return res.status(200).send(user)
     }catch(e){
        return res.status(500).json({message :e.message , status:"failed"})
      }
 })

app.get("/users",async(req,res)=>{
     try{
          const user = await User.find({"email":"prany@123"}).lean().exec()
          return res.status(201).send({user})
     }catch(e){
        return res.status(500).json({message :e.message , status:"failed"})
      }
})

app.get("/users/:id",async (req,res)=>{
    try{
     const user =await User.findById(req.params.id).lean().exec()
     return res.status(201).send(user)
    }catch(e){
        return res.status(500).json({message :e.message , status:"failed"})
      }
})

app.patch("/users/:id", async(req,res)=>{
    try{
        const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec()
        return res.status(201).send(user)
    }catch(e){
        return res.status(500).json({message :e.message , status:"failed"})
      }
})

app.delete("/users/:id", async(req,res)=>{
    try{
     const user = await User.findByIdAndDelete(req.params.id).lean().exec()
     return res.status(200).send(user) 
    }catch(e){
        return res.status(500).json({message :e.message , status:"failed"})
      }
})
///   ******************* user CRUD end ***********


/// ********************** post Crud *************

app.post("/posts", async(req,res)=>{
    try{
     const post =  await Post.create(req.body)
     return res.status(201).send(post)
    }catch(e){
      return res.status(500).json({message :e.message , status:"failed"})
    }
})

app.get("/posts", async (req,res)=>{
    try{
     const post = await Post.find().populate("user_id").populate("tag_id").lean().exec()
     return res.status(200).send(post)
    }catch(e){
        return res.status(500).json({message :e.message , status:"failed"})
      }
})
/*
app.get("/posts", async(req,res)=>{
    try{
     const post =await Post.find({"title":"my first post" }).lean().exec()
     return res.status(201).send(post)
    }catch(e){
        return res.status(500).json({message :e.message , status:"failed"})
      }
})
*/
app.get("/post/:id", async (req,res)=>{
    try{
    const post =await  Post.findById(req.params.id).lean().exec()
    return res.status(201).send(post)
    }catch(e){
        return res.status(500).json({message :e.message , status:"failed"})
      }
})


app.patch("/posts/:id", async (req,res)=>{
    try{
         const post = await Post.findByIdAndUpdate(req,params.id,req.body,{new: true }).lean().exec()
         return res.status(200).send(post)
    }catch(e){
        return res.status(500).json({message :e.message , status:"failed"})
    }
})
app.delete("/posts/:id", async(req,res)=>{
    try{
       const post = await Post.findByIdAndDelete(req.params.id).lean().exec()
       return res.status(200).send(post)
    }catch(e){
        return res.status(500).json({message :e.message , status:"failed"})
    }
})
/// ********************** post Crud end *************




 // **************** comment CRUD ***************
 app.post("/comments", async(req,res)=>{
    try{
     const comment =  await Comment.create(req.body)
     return res.status(201).send(comment)
    }catch(e){
      return res.status(500).json({message :e.message , status:"failed"})
    }
})

app.get("/", async(req,res)=>{
    try{
    const comment = await Comment.find().lean().exec()
    return res.status(200).send(comment)
    }catch(e){
       return res.status(500).json({message :e.message , status:"failed"})
     }
})

app.get("/comments",async(req,res)=>{
    try{
         const comment = await Comment.find({"email":"prany@123"}).lean().exec()
         return res.status(201).send({comment})
    }catch(e){
       return res.status(500).json({message :e.message , status:"failed"})
     }
})

app.get("/comments/:id",async (req,res)=>{
   try{
    const comment =await Comment.findById(req.params.id).lean().exec()
    return res.status(201).send(comment)
   }catch(e){
       return res.status(500).json({message :e.message , status:"failed"})
     }
})

app.patch("/comments/:id", async(req,res)=>{
   try{
       const comment = await Comment.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec()
       return res.status(201).send(comment)
   }catch(e){
       return res.status(500).json({message :e.message , status:"failed"})
     }
})

app.delete("/comments/:id", async(req,res)=>{
   try{
    const comment = await Comment.findByIdAndDelete(req.params.id).lean().exec()
    return res.status(200).send(comment) 
   }catch(e){
       return res.status(500).json({message :e.message , status:"failed"})
     }
})
///   ******************* comment CRUD end ***********


 // **************** tag CRUD ***************
 app.post("/tags", async(req,res)=>{
    try{
     const tag =  await Tag.create(req.body)
     return res.status(201).send(tag)
    }catch(e){
      return res.status(500).json({message :e.message , status:"failed"})
    }
})

app.get("/tags", async(req,res)=>{
    try{
    const tag = await Tag.find().lean().exec()
    return res.status(200).send(tag)
    }catch(e){
       return res.status(500).json({message :e.message , status:"failed"})
     }
})

app.get("/tags",async(req,res)=>{
    try{
         const tag = await Tag.find({"email":"prany@123"}).lean().exec()
         return res.status(201).send({tag})
    }catch(e){
       return res.status(500).json({message :e.message , status:"failed"})
     }
})

app.get("/tags/:id",async (req,res)=>{
   try{
    const tag =await Tag.findById(req.params.id).lean().exec()
    return res.status(201).send(tag)
   }catch(e){
       return res.status(500).json({message :e.message , status:"failed"})
     }
})

app.patch("/tags/:id", async(req,res)=>{
   try{
       const tag = await Tag.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec()
       return res.status(201).send(tag)
   }catch(e){
       return res.status(500).json({message :e.message , status:"failed"})
     }
})

app.delete("/tags/:id", async(req,res)=>{
   try{
    const tag = await Tag.findByIdAndDelete(req.params.id).lean().exec()
    return res.status(200).send(tag) 
   }catch(e){
       return res.status(500).json({message :e.message , status:"failed"})
     }
})
///   ******************* tag CRUD end ***********

app.listen(3456, async()=>{
    await connect()
        console.log("listing on port 3456")
})

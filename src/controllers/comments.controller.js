const express = require("express")

const Comment = require("../models/comment.model")

const router = express.Router()



 // **************** comment CRUD ***************
 router.post("", async(req,res)=>{
    try{
     const comment =  await Comment.create(req.body)
     return res.status(201).send(comment)
    }catch(e){
      return res.status(500).json({message :e.message , status:"failed"})
    }
})

router.get("/", async(req,res)=>{
    try{
    const comment = await Comment.find().lean().exec()
    return res.status(200).send(comment)
    }catch(e){
       return res.status(500).json({message :e.message , status:"failed"})
     }
})

router.get("",async(req,res)=>{
    try{
         const comment = await Comment.find({"email":"prany@123"}).lean().exec()
         return res.status(201).send({comment})
    }catch(e){
       return res.status(500).json({message :e.message , status:"failed"})
     }
})

router.get("/:id",async (req,res)=>{
   try{
    const comment =await Comment.findById(req.params.id).lean().exec()
    return res.status(201).send(comment)
   }catch(e){
       return res.status(500).json({message :e.message , status:"failed"})
     }
})

router.patch("/:id", async(req,res)=>{
   try{
       const comment = await Comment.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec()
       return res.status(201).send(comment)
   }catch(e){
       return res.status(500).json({message :e.message , status:"failed"})
     }
})

router.delete("/:id", async(req,res)=>{
   try{
    const comment = await Comment.findByIdAndDelete(req.params.id).lean().exec()
    return res.status(200).send(comment) 
   }catch(e){
       return res.status(500).json({message :e.message , status:"failed"})
     }
})
///   ******************* comment CRUD end ***********
module.exports = router


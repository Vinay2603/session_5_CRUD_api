const express = require("express")

const Tag = require("../models/tag.model")

const router = express.Router()

 // **************** tag CRUD ***************
 router.post("/tags", async(req,res)=>{
    try{
     const tag =  await Tag.create(req.body)
     return res.status(201).send(tag)
    }catch(e){
      return res.status(500).json({message :e.message , status:"failed"})
    }
})

router.get("/tags", async(req,res)=>{
    try{
    const tag = await Tag.find().lean().exec()
    return res.status(200).send(tag)
    }catch(e){
       return res.status(500).json({message :e.message , status:"failed"})
     }
})

router.get("/tags",async(req,res)=>{
    try{
         const tag = await Tag.find({"email":"prany@123"}).lean().exec()
         return res.status(201).send({tag})
    }catch(e){
       return res.status(500).json({message :e.message , status:"failed"})
     }
})

router.get("/tags/:id",async (req,res)=>{
   try{
    const tag =await Tag.findById(req.params.id).lean().exec()
    return res.status(201).send(tag)
   }catch(e){
       return res.status(500).json({message :e.message , status:"failed"})
     }
})

router.patch("/tags/:id", async(req,res)=>{
   try{
       const tag = await Tag.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec()
       return res.status(201).send(tag)
   }catch(e){
       return res.status(500).json({message :e.message , status:"failed"})
     }
})

router.delete("/tags/:id", async(req,res)=>{
   try{
    const tag = await Tag.findByIdAndDelete(req.params.id).lean().exec()
    return res.status(200).send(tag) 
   }catch(e){
       return res.status(500).json({message :e.message , status:"failed"})
     }
})
///   ******************* tag CRUD end ***********
module.exports = router
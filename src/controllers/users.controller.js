const express = require("express")

const User = require("../models/user.model")

const router = express.Router()


 // **************** user CRUD ***************
 router.post("", async(req,res)=>{
    try{
     const user =  await User.create(req.body)
     return res.status(201).send(user)
    }catch(e){
      return res.status(500).json({message :e.message , status:"failed"})
    }
})

router.get("/", async(req,res)=>{
    try{
    const user = await User.find().lean().exec()
    return res.status(200).send(user)
    }catch(e){
       return res.status(500).json({message :e.message , status:"failed"})
     }
})

router.get("",async(req,res)=>{
    try{
         const user = await User.find({"email":"prany@123"}).lean().exec()
         return res.status(201).send({user})
    }catch(e){
       return res.status(500).json({message :e.message , status:"failed"})
     }
})

router.get("/:id",async (req,res)=>{
   try{
    const user =await User.findById(req.params.id).lean().exec()
    return res.status(201).send(user)
   }catch(e){
       return res.status(500).json({message :e.message , status:"failed"})
     }
})

router.patch("/:id", async(req,res)=>{
   try{
       const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec()
       return res.status(201).send(user)
   }catch(e){
       return res.status(500).json({message :e.message , status:"failed"})
     }
})

router.delete("/:id", async(req,res)=>{
   try{
    const user = await User.findByIdAndDelete(req.params.id).lean().exec()
    return res.status(200).send(user) 
   }catch(e){
       return res.status(500).json({message :e.message , status:"failed"})
     }
})


module.exports = router
///   ******************* user CRUD end ***********
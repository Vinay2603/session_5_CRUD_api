const express = require("express")

const Post = require("../models/post.model")

const router = express.Router()


/// ********************** post Crud *************

router.post("", async(req,res)=>{
    try{
     const post =  await Post.create(req.body)
     return res.status(201).send(post)
    }catch(e){
      return res.status(500).json({message :e.message , status:"failed"})
    }
})

router.get("", async (req,res)=>{
    try{
     const post = await Post.find().populate("user_id").populate("tag_id").lean().exec()
     return res.status(200).send(post)
    }catch(e){
        return res.status(500).json({message :e.message , status:"failed"})
      }
})
/*
router.get("", async(req,res)=>{
    try{
     const post =await Post.find({"title":"my first post" }).lean().exec()
     return res.status(201).send(post)
    }catch(e){
        return res.status(500).json({message :e.message , status:"failed"})
      }
})
*/
router.get("/:id", async (req,res)=>{
    try{
    const post =await  Post.findById(req.params.id).lean().exec()
    return res.status(201).send(post)
    }catch(e){
        return res.status(500).json({message :e.message , status:"failed"})
      }
})


router.patch("/:id", async (req,res)=>{
    try{
         const post = await Post.findByIdAndUpdate(req,params.id,req.body,{new: true }).lean().exec()
         return res.status(200).send(post)
    }catch(e){
        return res.status(500).json({message :e.message , status:"failed"})
    }
})
router.delete("/:id", async(req,res)=>{
    try{
       const post = await Post.findByIdAndDelete(req.params.id).lean().exec()
       return res.status(200).send(post)
    }catch(e){
        return res.status(500).json({message :e.message , status:"failed"})
    }
})




module.exports = router
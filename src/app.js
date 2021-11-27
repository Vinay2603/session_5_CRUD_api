const express  = require("express")

const connect = require("./configs/db")



const userController = require("./controllers/users.controller")
const postController = require("./controllers/posts.controller")
const tagController = require("./controllers/tags.controller")
const commentController = require("./controllers/comments.controller")
// **************** 

 const app = express()
 app.use(express.json())



app.use("/posts",postController)

app.use("/comments",commentController)

app.use("/users",userController)

app.use("/tags",tagController)




app.listen(3456, async()=>{
    await connect()
        console.log("listing on port 3456")
})

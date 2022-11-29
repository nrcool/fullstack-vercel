import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config(); 
import cookieParser from "cookie-parser"
import usersRoute from "./routes/usersroute.js"
import recordsRoute from "./routes/recordsroute.js"
import ordersRoute from "./routes/ordersroute.js"
/* import cors from "cors" */

//creating/initializing express server
const app = express()
const PORT = process.env.PORT || 4000; 

//config multer package //setting storage destination for our file
/* const upload = multer({dest:"upload/"}) */

//setup multer diskStorage


//create mongoose connection
mongoose.connect(process.env.MONGO_URI , ()=>{
    console.log("DB connection established ! ")
})

//cors middleware
/* app.use(cors({origin:"http://localhost:3000",exposedHeaders:["token"]})) */

// app.use all methods : get,post,patch, ..... any URL 
// external and custom middleware

//expres json middleware to parse any incoming json data
app.use(express.json())


//cookie parser
app.use(cookieParser())


// serve static files/pages
/* app.use(express.static("upload")) */
// serve static files in views/build folder
app.use(express.static("./views/build"))

app.get("/",(req,res)=>{
    res.sendFile("./views/build/index.html", {root:"."})
})

//Customer middleware
/* function log(req,res,next){
        console.log("I am a middleware")
        next() 
}
function checkMethod(req,res,next){
    console.log("I am Second middleware")
    next()
}
function thirdMiddleware(req,res,next){
    console.log("I am third middleware")
}

app.use(  log , checkMethod , thirdMiddleware) */

//MVC 
// MODELS (data storage)
// VIEWS (UI ,frontend , presentational data)
// CONTROLLERS (request handlers , logic)

//Routes 
// "/users" GET POST PATCH DELETE // upload.single will attached req.file
app.use("/users",  usersRoute)

// "/records" GET POST PATCH DELETE
app.use("/records",recordsRoute)

// "/orders" GET POST PATCH DELETE
app.use("/orders", ordersRoute)

// handling 404 page not found error (error handling middleware)
app.use( (req,res,next)=>{
   /*  res.json({success:false, message:"there is no such route found"}) */
    res.sendFile("./views/pageNotFound.html",{root:"."})
})


//universal error handler middleware
// request along with an error enters into this middleware
app.use(( err, req,res,next)=>{
    res.status(err.status || 500).json({success:false, message:err.message})
})

//listening request on port 4000
app.listen(PORT, ()=>console.log("server is running on port :",PORT))


const express=require("express")
const path=require("path")
const cookieParser=require("cookie-parser")
const {restrictToUserLoggedinUserOnly,checkAuth}=require("./middleware/auth.js")

const urlRouter =require("./routes/url.js")
const staticRouter=require('./routes/staticRouter.js')
const userRouter=require('./routes/user.js')

const {connectmongoDb}=require("./dbConnect.js")


const app=express()
const PORT=8001

connectmongoDb( "mongodb://127.0.0.1:27017/URL-shortener")
.then(()=>console.log("database connected"))

app.set('view engine','ejs')
app.set("views",path.resolve("./views"))

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

//1
app.use("/url",restrictToUserLoggedinUserOnly,urlRouter)
//2
app.use('/',checkAuth,staticRouter)
//3
app.use("/user",userRouter)

app.listen (PORT,()=>{
    console.log("server listen at port :",PORT);
})
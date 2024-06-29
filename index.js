const express=require("express")
const path=require("path")
const urlRoute =require("./routes/url.js")
const staticRouter=require('./routes/staticRouter.js')
const {connectmongoDb}=require("./dbConnect.js")
const URL=require("./models/url.js")

const app=express()
const PORT=8001

connectmongoDb( "mongodb://127.0.0.1:27017/URL-shortener")
.then(()=>console.log("database connected"))

app.set('view engine','ejs')
app.set("views",path.resolve("./views"))

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use("/url",urlRoute)

app.use('/',staticRouter)


app.get("/url/:shortid",async(req,res)=>{
    const shortId=req.params.shortid
    const entry=await URL.findOneAndUpdate(
        {
        shortId
        },
        {
            $push:{
                visitHistory:{
                    timestamp:Date.now(),
                }
            },
        }
    )
    if (!entry) {
        return res.status(404).json({ error: "URL not found" });
    }
    res.redirect(entry.redirectURL)

})

app.listen (PORT,()=>{
    console.log("server listen at port :",PORT);
})
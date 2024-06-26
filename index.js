const express=require("express")
const urlRoute =require("./routes/url.js")
const {connectmongoDb}=require("./dbConnect.js")
const URL=require("./models/url.js")

const app=express()
const PORT=8001

connectmongoDb( "mongodb://127.0.0.1:27017/URL-shortener")
.then(()=>console.log("database connected"))


app.use(express.json())

app.use("/url",urlRoute)

app.get("/:shortid",async(req,res)=>{
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
const shortid=require('shortid')
const URL=require("../models/url.js")


//function for generating short urls
async function handleGenerateShortUrl(req,res){
    const body=req.body
    if(!body.url) return res.status(400).json({error:"url is required"})
    const shortId=shortid()
    await URL.create({
        shortId:shortId,
        redirectURL:body.url,
        visitHistory:[],
        createdBy:req.user._id
    })
    return res.render('home',{
        id:shortId,
    })
}

//run URL if shortid given 
async function FindSiteByShortId(req,res){
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

}

//check total clicks for any specific shortid
async function handlegetAnalytics(req,res){
    const shortId=req.params.shortid
    const result=await URL.findOne({shortId})
    return res.json({
        totalclicks:result.visitHistory.length,
        analytics:result.visitHistory
    })
}

module.exports={handleGenerateShortUrl,handlegetAnalytics,FindSiteByShortId}
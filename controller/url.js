const shortid=require('shortid')
const URL=require("../models/url.js")

async function handleGenerateShortUrl(req,res){
    const body=req.body
    if(!body.url) return res.status(400).json({error:"url is required"})
    const shortId=shortid()
    await URL.create({
        shortId:shortId,
        redirectURL:body.url,
        visitHistory:[],
    })
    return res.render('home',{
        id:shortId,
    })
}

async function handlegetAnalytics(req,res){
    const shortId=req.params.shortid
    const result=await URL.findOne({shortId})
    return res.json({
        totalclicks:result.visitHistory.length,
        analytics:result.visitHistory
    })
}

module.exports={handleGenerateShortUrl,handlegetAnalytics}
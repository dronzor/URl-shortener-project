const express=require("express")
const { handleGenerateShortUrl, handlegetAnalytics } = require("../controller/url.js")
const router=express.Router()


router.post("/",handleGenerateShortUrl)

router.get("/analytics/:shortid",handlegetAnalytics)

module.exports=router
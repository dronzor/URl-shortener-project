const express=require("express")
const { handleGenerateShortUrl, handlegetAnalytics, FindSiteByShortId } = require("../controller/url.js")
const router=express.Router()

//used for generate short link(1.1)
router.post("/",handleGenerateShortUrl)

//used for run website or Url if shortid is given(1.2)
router.get("/:shortid",FindSiteByShortId)

//used to watch total clicks,visit history for links(1.3)
router.get("/analytics/:shortid",handlegetAnalytics)

module.exports=router
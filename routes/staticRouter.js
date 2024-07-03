const express=require('express')
const  URL  = require('../models/url.js')

const router=express.Router()

//pass all URL model data to home\e.ejs(web)(2.1)
router.get('/',async(req,res)=>{
    if(!req.user) return res.redirect('/login')
    // const allurls=await URL.find({})  //for showing all url
    const allurls=await URL.find({createdBy:req.user._id})
    return res.render('home',{
        urls:allurls,
    })
})

router.get('/signup',(req,res)=>{
    return res.render('signup')
})

router.get('/login',(req,res)=>{
    return res.render('login')
})
module.exports=router
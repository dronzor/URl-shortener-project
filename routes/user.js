const express=require("express")
const { handleUserSignup,handleUserLogin } = require("../controller/user.js")
const router=express.Router()

//used for generate short link(1.1)
router.post("/",handleUserSignup)

router.post("/login",handleUserLogin)


module.exports=router
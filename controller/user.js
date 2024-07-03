const {v4:uuidv4}=require("uuid")
const User=require("../models/user.js")
const {setUser}=require("../service/auth.js")

async function handleUserSignup(req,res){
    const {name,email,password} =req.body

    await User.create({
        name,
        email,
        password,
    })
    return res.redirect("/")
}

async function handleUserLogin(req,res){
    const {email,password} =req.body
    const user=await User.findOne({email,password})
    if (!user){
        return res.render('login',{
            error:"invalid username or password"
        })
    }
    const sessionid=uuidv4()
    console.log(`cokkie generate ${sessionid}`);
    setUser(sessionid,user)
    res.cookie("uid",sessionid)
    return res.redirect("/")
}
module.exports={handleUserSignup,handleUserLogin}

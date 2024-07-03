const {getUser} =require("../service/auth.js")

async function restrictToUserLoggedinUserOnly(req,res,next){
    const UserUid=req.cookies?.uid
    // console.log(UserUid);
    if(!UserUid) return res.redirect("/login")

    const user=getUser(UserUid)
    // console.log(`user found ${user}`);

    if(!user) return res.redirect("/login")

    req.user=user
    
    next()
}

async function checkAuth(req,res,next){

    const UserUid=req.cookies?.uid

    const user=getUser(UserUid)
    console.log(user);

    req.user=user
    
    next()
}

module.exports={restrictToUserLoggedinUserOnly,checkAuth}
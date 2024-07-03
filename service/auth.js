const sessionIdToUserMap=new Map()

function setUser(id,user){
    sessionIdToUserMap.set(id,user)
    console.log("used added");
    console.log(sessionIdToUserMap);
}
function getUser(id){
    const user=sessionIdToUserMap.get(id)
    return user

}

module.exports={setUser,getUser,}
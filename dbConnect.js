const mongoose=require("mongoose")

mongoose.set("strictQuery",true)
async function connectmongoDb(url){
    return await mongoose.connect(url)
}

module.exports={connectmongoDb}
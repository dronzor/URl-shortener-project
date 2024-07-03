const mongoose= require("mongoose")

const urlschema=mongoose.Schema({
    shortId:{
        type:String,
        required:true,
        unique:true
    },
    redirectURL:{
        type:String,
        required:true,
    },
    visitHistory:[
        {timestamp:{type:Number}}
    ],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
    },
},
{timestamps:true}
)

const URL=mongoose.model("URL",urlschema)

module.exports=URL
const { Schema ,models, model } = require("mongoose")

const posterSchema = Schema({
    title :{
        type:String,
        required:true,

    },
    description :{
        type:String,
        required :true, 
    },
    location:{
        type:String,
        required:true,
    },
    phone:{
        type:String, 
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },

    realState:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
        enum:["villa" ,"apartment" , "store" , "office"]
    },

    amenities:{
        type:[String],
        default:[]  
    },

    rules :{
        type:[String],
        default:[]
    },

    images: {
        type:[String],
        default:[]
    },
    constructionDate :{
        type:Date,
        required:true,
    }, 

    published:{
        type:Boolean,
        default:false,
    },
    userId:{
        type :Schema.Types.ObjectId,
        ref:'homeUser'
    }
    
}, {timestamps:true})



module.exports = {
    posterModel :models?.profiles ||  model("profiles" , posterSchema)
}
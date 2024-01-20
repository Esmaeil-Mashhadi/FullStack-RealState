const {Schema , model , models} = require('mongoose')

const userSchema = new Schema ({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String, 
        default :"USER"
    },

    createdAt :{
        type:Date,
        default : ()=> Date.now(),
        immutable:true
    },
})


const userModel = models?.homeUser || model("homeUser" , userSchema)

module.exports ={
    userModel
}
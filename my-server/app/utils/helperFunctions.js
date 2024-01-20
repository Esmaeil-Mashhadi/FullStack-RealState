const { hash, compare } = require("bcrypt")
const path = require('path')
const createHttpError = require("http-errors")
const { userModel } = require("../../models/user")
const { posterModel } = require("../../models/poster")

function imageHandler(files , fileUploadPath ){
 
    if(files?.length){
      return files.map(image => { 
        if(image){
          return path.join(fileUploadPath , image.filename)
        }else{
          return null
        }
        
      }).map(url => url.replace(/\\/g ,'/') )
    }
    
   }

async function checkUserAccessiblity(authOptions){

    const {status , expiration , email} = authOptions

    const epxirationDate = new Date(expiration).getTime()
   if(status !=='authenticated') throw createHttpError.BadRequest('login first')
   if(Date.now() > epxirationDate) throw createHttpError.Gone('you need to login')
  
   const user = await userModel.findOne({email})
   if(!user) throw createHttpError.NotFound('failed to find the user')
  
   return user
  }
  


async function handlPosterRules(title , user){

    const userExistence = await userModel.findOne({_id: user._id})
    if(!userExistence) throw createHttpError("couldn't find the user ")
    const poster = await posterModel.findOne({title})
    if(poster) throw createHttpError.BadRequest("you already set this poster")
    const [data] = await userModel.aggregate([
      {$match : {_id: user._id}},
      {$lookup : {
        from :'userposters',
        localField:"_id",
        foreignField:'userId',
        as: 'posters'
    }}
    ])
    
    if(data.posters.length > 3 ) throw createHttpError.Forbidden("Each user is allowed to post a maximum of three posters.")
    }




 async function hashPassword(password) {
      const hashedPassword = await hash(password, 12);
      return hashedPassword;
    }
    
 async function verifyPassword(password, hashedPassword) {
      const isValid = await compare(password, hashedPassword);
      return isValid;
    }
    
    


 module.exports = {
    imageHandler,
    checkUserAccessiblity,
    handlPosterRules,
    verifyPassword,
    hashPassword

   }
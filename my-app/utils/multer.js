const multer = require("multer");
const { diskStorage } = require("multer");
const fs = require('fs');
const path = require("path");
const createHttpError = require("http-errors");
const { v4 } = require("uuid");


const createDirectory = (req)=>{
 const date = new Date()
 const year = date.getFullYear().toString()
 const month = date.getMonth().toString()
 const day = date.getDay().toString()
 req.body.uploadPath =  path.join('/multeruploads' , year , month , day)
fs.mkdirSync(path.join(__dirname , ".." , 'public','multerUploads', year , month , day) , {recursive:true} )
const destFoolder = path.join(__dirname , ".." , 'public','multerUploads', year , month , day)
return destFoolder

}

const imageFilter = (req , file , cb)=>{
    const validExt = ['.jpeg' , '.png' , '.webp' , '.jpg']
    const ext = path.extname(file.originalname)
    if(!validExt.includes(ext)) cb(createHttpError.BadRequest('image format is not supported'))
    cb(null , true)
    
}
const storage = diskStorage({
    destination : (req , file , cb)=>{
        const destination = createDirectory(req)

     cb(null , destination)
    },
    filename : (req , file , cb)=>{
        const ext =  path.extname(file.originalname) 
        const uniqueID = v4()
        const fileName = path.join( uniqueID + ext)
        cb(null , fileName)
    }
})


const maximumSize = 3*1000*1000


const imageUpload =  multer({storage  , imageFilter, limits:{fileSize:maximumSize}})


module.exports = {
    imageUpload
}
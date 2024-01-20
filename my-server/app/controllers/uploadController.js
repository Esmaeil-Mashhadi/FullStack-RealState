const createHttpError = require("http-errors")
const fs = require('fs')
const path = require("path")
const { default: mongoose } = require("mongoose")
const { checkUserAccessiblity, imageHandler, handlPosterRules } = require("../utils/helperFunctions")
const { decode } = require("jsonwebtoken")
const { posterModel } = require("../../models/poster")
const { objectCopy } = require("../../../my-app/utils/helperFunctions")

const deleteImageInPublic = (fileAddress)=>{
    if(fileAddress){
        const imagePath = path.join(__dirname , ".." , ".." , ".." ,'my-app' , 'public' , fileAddress)
        if(fs.existsSync(imagePath)){
            fs.unlinkSync(imagePath)
        }
    }

}



class UploadController {
    addPoster = async(req , res , next)=>{
        try {
            const data = req.body
            
         
            const files = req.files
            const uploadPath = req.body.uploadPath
            const images = imageHandler(files , uploadPath)
            const mySession  = decode(req.cookies.authorization)
            const session= JSON.parse(data.session) 
           
           

            const sessionOptions ={
                status: (mySession?.email || session.status == 'authenticated') && 'authenticated',
                expiration : session.data?.expires || (mySession?.exp)*1000,//jwt gives second , for comparing with date.now i converted it to mlsecond
                email : session.data?.user?.email || mySession?.email,
            }
      
            
            if(sessionOptions.status =="unauthenticated") throw createHttpError.Forbidden("you must login first")
              
             const user = await checkUserAccessiblity(sessionOptions)
             const {title , description , location, phone , realState , price , constructionDate , category , amenities , rules} = data

            if(!title || !description || !location || !phone || !realState || !price || !constructionDate || !category){
                throw createHttpError.BadRequest("invalid data")
            }
            await handlPosterRules(title , user)
            const newPoster = await posterModel.create({
                title , description , location , 
                phone , realState , price: +price ,
                 constructionDate , amenities , rules , 
                 category , userId :user._id , images
             })
    
             if(newPoster){
                return res.status(201).json({
                    statusCode:201 , 
                    data:{
                        message:"your add Submitted for admin approval"
                    }
                })
             }else{
               throw createHttpError.InternalServerError("failed to submit your add")
             }
             
            
        } catch (error) {
            deleteImageInPublic(req.uploadPath)
            next(error)
        }
    }


    updatePoster = async(req , res , next)=>{
        try {
            const {id} = req.params
            const data = req.body
            const files = req.files
           
            const {title , description , location, phone ,
                realState , price , constructionDate ,
                category , imageIndex , removedImage } = data  
          
                
             if(!mongoose.isValidObjectId(id)) throw createHttpError.BadRequest("please enter valid id")


            if(!title || !description || !location || !phone || !realState || !price || !constructionDate || !category){
                throw createHttpError.BadRequest("invalid data")
            }

            data.amenities = JSON.parse(data?.amenities)
            data.rules =  JSON.parse(data?.rules) 

          
            const poster = await posterModel.findOne({_id:id})
            if(!poster) throw createHttpError.NotFound("poster doesn't exist")

            let{images} = objectCopy(poster)

            const result = imageHandler(files , req.body?.uploadPath)
            if(result?.length){
                if(Array.isArray(imageIndex)){
                    imageIndex.forEach((itemIndex , index)=>{
                        deleteImageInPublic(images[itemIndex])
                        images[itemIndex] = result[index]

                    }) 
                }else{
                    deleteImageInPublic(images[imageIndex])
                    images[imageIndex] = result[0]
                }
            } 
   
            if(removedImage){
                if(Array.isArray(removedImage)){
                 removedImage.forEach(item => {
                    deleteImageInPublic(images[item])
                     })
                     
                    let removedIndexs = []

                     for (const item of removedImage) {
                         removedIndexs.push(...images.slice(item , item + 1))
                     }

                     images =  images.filter(img => !removedIndexs.includes(img))

                }else{
                    deleteImageInPublic(images[removedImage])
                     images.splice(removedImage , 1)
                }

            } 
 
         

            const updatePoster = await posterModel.updateOne({_id:id} , {$set :{...data , images }})
            if(updatePoster.modifiedCount){
                return res.status(200).json({
                    statusCode:200, 
                    data: {
                        message:"updated successfully"
                    }
                })
            }


             throw createHttpError.InternalServerError("something went wrong")
        } catch (error) {
            deleteImageInPublic(req.uploadPath)
            next(error)
        }
    }


}




module.exports = {
    uploadController : new UploadController()
}
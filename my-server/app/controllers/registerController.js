const createHttpError = require("http-errors")
const {hashPassword} = require("../utils/helperFunctions")
const { sign } = require("jsonwebtoken")
const { userModel } = require("../../models/user")

class RegisterController  {
    signUp = async(req , res , next)=>{
        try {

            const {email , password} = req.body
            if(!email && !password) throw createHttpError.BadRequest('invalid data')
            const user = await userModel.findOne({email})
            if(user) throw createHttpError.BadRequest("user already exist")

            const hashedPassword =await hashPassword(password)
            const secretKey = process.env.SIGN_SECRET_KEY
            const token = sign({email}, secretKey , {expiresIn:"7d"})
            if(!token) throw createHttpError.InternalServerError("something went wrong!")

            res.cookie('authorization' , token, secretKey ,  {signed: true ,httpOnly:true} , {expires: new Date(Date.now() + 1000*60*60*24*7)})

            const result = await userModel.create({email, password:hashedPassword , token})
            if(!result) throw createHttpError.InternalServerError("failed to sign up")
            return res.status(201).json({
                status:201, 
                data:{message :"you signed up successfully"}
            })
        } catch (error) {
            next(error)
        }
    }
}



module.exports = {
    RegisterController : new RegisterController()
}
const { urlencoded } = require("express")
const express = require('express')
const path = require('path')
const { default: mongoose } = require("mongoose")
const { allRoutes } = require("./routers/router")
const createHttpError = require("http-errors")
 require('dotenv').config()
const cors = require('cors')
const cookieParser = require("cookie-parser")



class NodejsApplicationConfig {
 app = express()
 #DB_URL
 #PORT
 constructor(PORT , DB_URL){
    this.#PORT = PORT
    this.#DB_URL= DB_URL
    this.dataBaseConfig()
    this.expressConfig()
    this.serverConfig()
    this.errorHandler()
 } 


 dataBaseConfig = ()=>{
    mongoose.connect(this.#DB_URL).then(()=> console.log('connected to data base')).catch((err)=>
      console.log(err)
    ) 

    process.on('SIGINT' , async()=>{
      mongoose.connection.close()
      process.exit(0)
    })
 }

 expressConfig = ()=>{ 
   this.app.use(cors({origin:"http://localhost:3000" , credentials:true}))
   this.app.use(urlencoded({extended:true}))
   this.app.use(express.json())
   this.app.use(express.static(path.join(__dirname , ".." , 'public')))
   this.app.use(cookieParser(process.env.COOKIE_SECRET))
 
    this.app.use(allRoutes)
   
 }

 serverConfig = ()=>{
  this.app.listen(this.#PORT , ()=>{
    console.log(`server an onr port http://localhost:${this.#PORT}:`);
  })
 }

 errorHandler = ()=>{
  this.app.use((req,  res ,next)=>{
    next(createHttpError.NotFound("couldn't find the address"))
  })

  this.app.use((err , req , res , next)=>{
    const statusCode = err.statusCode || createHttpError.InternalServerError().status
    const  message = err.message || createHttpError.InternalServerError().message
    return res.status(statusCode).json({
      statusCode , 
      data : {
        message
      }
    })
  })
 }



}

module.exports = {
  NodejsApplicationConfig
}




import { posterModel } from "@/models/poster";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";
const fs = require("fs")
const path = require('path')


export async function DELETE(req , context){
 try {
    await connectDB()
    const id = context.params.posterID
    const result = await posterModel.findOneAndDelete({_id :id})

    if(result){
         result.images.forEach(img => {
            const pathFile = path.join('public' , img)
            if(fs.existsSync(pathFile)){
                fs.unlinkSync(pathFile)
            }
         })
        return NextResponse.json({
            statusCode : 200 , 
                message:"add removed successfully"
        })

    }

 } catch (error) {
    console.log(error);
 }
}

export async function PATCH(req, context){
    try {
        await connectDB()
        const id = context.params.posterID
        const result = await posterModel.updateOne({_id : id} , {$set :{published: true}})
        if(result.modifiedCount){
            return NextResponse.json({status:200 , message:"poster published successfully"})
        }else{
            return NextResponse.json({status:200} , {error:" failed to publish poster"})
        }
    } catch (error) {
        console.log(error);
    }
}
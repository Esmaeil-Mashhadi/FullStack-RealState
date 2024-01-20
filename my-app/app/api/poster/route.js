import { posterModel } from "@/models/poster";
import { userModel } from "@/models/user";

import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req){

   try {

      await connectDB()
      const body =await req.json()
      const {title , description , location, phone , realState , price , constructionDate , category , amenities , rules} = body
      
      const session = await getServerSession(req) || req.signedCookies['authorization']
      if(!session){
         return NextResponse.json({ error:"Your are not logged in"} , {status:"401"})
      }
      const user = await userModel.findOne({email : session.user.email})
      if(!user){
         return NextResponse.json({ error:"user Desn't exist"} ,{status:404})
      }
      
      if(!title || !description || !location || !phone || !realState || !price || !constructionDate || !category){
         return NextResponse.json({ error:"Please enter valid data"} ,{status:401})}

         const newPoster = await posterModel.create({
            title , description , location , phone , realState , price: +price , constructionDate , amenities , rules , category , userId :user._id 
         })

         if(newPoster){
            return NextResponse.json({ message:"You add sent to admin for confirming successfully"} ,{status:201})
         }else{
            return NextResponse.json({message:"failed to add data"})
         }

      

   } catch (error) {
      console.log(error);
      return NextResponse.json({error:"failed to connect do data base"},{status:500})
   }


}




export async function PATCH(req){
   try {
      await connectDB()
      const body = await req.json()
      const {_id ,title , description , location, phone , realState , price , constructionDate , category , amenities , rules}  = body
      const session = await getServerSession(req)
      if(!session){
         return NextResponse.json({error:"you don't have permission for this action"} , {status:401})
      }

     
      
      const user = await userModel.findOne({email : session.user.email})
      if(!user){
         return NextResponse.json({error:"Ueser not found"} , {status:404})
      }
      
      
      if(!title || !description || !location || !phone || !realState || !price || !constructionDate || !category || !_id ){
         return NextResponse.json({ error:"Please enter valid data"} ,{status:400})}
       

      const poster = await posterModel.findOne({_id})
      if(!user._id.equals(poster.userId)){
         return NextResponse.json({error:"you are not allowed to edit this poster "} , {status:403})
      }

      const result = await posterModel.updateOne({_id} , {$set: body})
      if(result.modifiedCount){
         return NextResponse.json({message:"The Ad editted successfully"} , {status:200})
      }else{
         return NextResponse.json({error:"failed to edit add adas"} , {status:500})
      }

 

   } catch (error) {
      return NextResponse.json({error:"failed to connect to data base"} , {status:500})
   }
}


export async function GET(){
   try {
      await connectDB()
      const addss = await posterModel.find({published:true}).select("-userId")
     
      return NextResponse.json({data : addss}, {status:200})
   } catch (error) {
      console.log(error);
      return NextResponse.json({error:"failed to connect to data base"} , {status:500})
   }
}



import { userModel } from "@/models/user";
import { hashPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";


export async function POST(req) {
    try {
      await connectDB();
  
      const { email, password } = await req.json();
      
        if(!email && !password){
            return NextResponse.json({error :"please Enter valid data"} , {status:422})
        }


        const existingUser = await userModel.findOne({email})
        if(existingUser){
          return  NextResponse.json({error:"User already Exist"} ,{status:422})
        }

        const hashedPassword = await hashPassword(password)

        const newUser = await userModel.create({
            email , password : hashedPassword
        })

        if(newUser){
            return NextResponse.json({message:"You Signed up Successfully" ,status : 201})
        }else{
            return NextResponse.json({message:"failed to Register "} , {status:500})
        }

    } catch (error) {
            return NextResponse.json({error :"failed to connect to DB" , status:500})
    }


}
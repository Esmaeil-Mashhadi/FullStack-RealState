import  CredentialsProvider  from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import { verifyPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";
import { userModel } from "@/models/user";

export const authOptions = {
    session: { strategy: "jwt" },
    providers: [
      CredentialsProvider({
        async authorize(credentials) {
          const { email, password } = credentials;
          try {
            await connectDB();
          } catch (error) {
            throw new Error("failed to connect to database");
          }
           
          if (!email || !password)
          throw new Error ("invalid data !");

           const user = await userModel.findOne({email})
           if(!user){
            throw new Error("Please Sign up first")
           }

           const isValid = await verifyPassword(password , user.password)
           if(!isValid){
            throw new Error ("email or password is not right")
           }
            return {email}
            
           }
        })
    ]
}

const handler = NextAuth(authOptions)

export {handler as GET , handler as POST}

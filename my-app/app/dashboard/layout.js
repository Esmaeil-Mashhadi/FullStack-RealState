import DashboardSidebar from "@/components/layout/DashboardSidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import connectDB from "@/utils/connectDB";
import { posterModel } from "@/models/poster";
import { userModel } from "@/models/user";
import { getClientCookies } from "@/utils/helperFunctions";
import {cookies} from 'next/headers'

export const metadata = {
    title: 'Dashboard',
    description: 'Buy and Sell Properties',
  
  }

const DashLayout = async ({children}) => {
    const session = await getServerSession(authOptions) || await getClientCookies(cookies)
    const permission = !!(await getServerSession(authOptions))?.user?.email || (await getClientCookies(cookies))?.status == 'authenticated'
   if(!permission) redirect("/login")

   await connectDB()
   const user = await userModel.findOne({email : session?.user?.email})
   if(!user){
    return <h3 style={{margin:"50px" , color:'red'}}>Unauthorized action register again !</h3>
   }

   const dbPosters = await posterModel.find({published:false})
    
   const posters = JSON.parse(JSON.stringify(dbPosters)) 

    return (
        <DashboardSidebar role={user.role} email={user.email} awaitNumber={posters?.length}>
         {children} 
        </DashboardSidebar>
    );
};

export default DashLayout;
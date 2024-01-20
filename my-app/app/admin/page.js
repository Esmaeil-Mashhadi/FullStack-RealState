import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import { getClientCookies, objectCopy } from "@/utils/helperFunctions";
import AdminPage from "@/components/templates/AdminPage";
import { posterModel } from "@/models/poster";
import { userModel } from "@/models/user";
import {cookies} from 'next/headers'


const Admin = async() => {
    await connectDB()
    const session = await getServerSession(authOptions)  || await getClientCookies(cookies)
    const permission =  (await getServerSession(authOptions)).user.email ||  (await getClientCookies(cookies)).status == "authenticated"
    ;
    if(!permission){
        redirect("/login")
    }

    const user = await userModel.findOne({email : session.user.email})
    if(user.role!=="Admin"){
        redirect("/dashboard")
    }

    const data = await posterModel.find({published:false})
    
    const posters  = objectCopy(data)
    
    return (
        <div>
           <DashboardSidebar role={user.role} email={user.email} awaitNumber ={posters?.length}>
                <AdminPage posters = {posters}/>
           </DashboardSidebar>
        </div>
    );
};

export default Admin;
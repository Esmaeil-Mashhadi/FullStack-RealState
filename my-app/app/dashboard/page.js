import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import connectDB from "@/utils/connectDB";

import DashboardPage from "@/components/templates/DashboardPage";
import { userModel } from "@/models/user";
import { cookies } from "next/headers";
import { getClientCookies } from "@/utils/helperFunctions";


const DashBoard = async () => {

    await connectDB()
    const session = await getServerSession(authOptions)  ||await getClientCookies(cookies)
    const user = await userModel.findOne({email: session?.user?.email})

    return (
        <div>
           <DashboardPage createdAt={user.createdAt}/>
        </div>
    );
};

export default DashBoard;
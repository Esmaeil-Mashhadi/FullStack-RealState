import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SignUpPage from "@/components/templates/Signup";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import {cookies} from 'next/headers'
import { getClientCookies } from "@/utils/helperFunctions";

const Signup = async () => {
    const session = !!(await getServerSession(authOptions))?.user?.email || (await getClientCookies(cookies))?.status == 'authenticated' 
    if(session)redirect("/dashboard")

    return (
        <div>
            <SignUpPage/>
        </div>
    );
};

export default Signup;
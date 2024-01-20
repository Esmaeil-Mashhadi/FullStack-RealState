import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import LoginPage from "@/components/templates/Login";
import { getClientCookies } from "@/utils/helperFunctions";
import { cookies } from "next/headers";

const Login = async() => {
    const session = !!(await getServerSession(authOptions))?.user?.email || (await getClientCookies(cookies))?.status == 'authenticated' 
    if(session)redirect("/dashboard")

    return (
            <LoginPage/>
    );
};

export default Login;
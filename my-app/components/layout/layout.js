import connectDB from "@/utils/connectDB";
import Footer from "./Footer";
import Header from "./Header";
import { posterModel } from "@/models/poster";
import { getClientCookies, objectCopy } from "@/utils/helperFunctions";
import { cookies } from "next/headers";

const Layout = async({children}) => {

    await connectDB()
    const posters = await posterModel.find({} , {title:1 , location: 1 , realState: 1 })
    const searchPosters = objectCopy(posters)
   
    const session =  await getClientCookies(cookies)

    return (
        <div>
            <Header searchPosters = {searchPosters } session={session}/>
            <div style={{minHeight:"700px"}}>{children}</div>
            <Footer/>
        </div>
    );
};

export default Layout;
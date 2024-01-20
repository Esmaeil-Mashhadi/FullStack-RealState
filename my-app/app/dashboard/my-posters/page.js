import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import MyPostersPage from '@/components/templates/MyPostersPage';
import { userModel } from '@/models/user';

import connectDB from '@/utils/connectDB';
import { getClientCookies, objectCopy } from '@/utils/helperFunctions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import {cookies} from 'next/headers'


import React from 'react';

const myPosters = async() => {
    await connectDB()
    const session = await getServerSession(authOptions)  || await getClientCookies(cookies)
    const permission = !!(await getServerSession(authOptions))?.user?.email || (await getClientCookies(cookies))?.status == 'authenticated'

     if(!permission) redirect('/login')
     const [user] = await userModel.aggregate([
        {$match : {email: session?.user?.email}},
        {$lookup : {
            from :'profiles',
            localField:"_id",
            foreignField:'userId',
            as: 'posters'
        }}, 
        
    ])

    const posters = objectCopy(user.posters)
    return (
        <div>
            <MyPostersPage posters={posters} />
        </div>
    );
};

export default myPosters;
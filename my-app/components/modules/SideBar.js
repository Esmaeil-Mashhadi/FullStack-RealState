import Link from 'next/link';
import styles from './SideBar.module.css'


//icons
import {MdCategory} from 'react-icons/md'
import{DiGhostSmall} from 'react-icons/di'
import {RiHome3Line} from 'react-icons/ri'
import {MdApartment} from 'react-icons/md'
import {BiStore} from 'react-icons/bi'
import{GiOfficeChair} from 'react-icons/gi'
import Hambutton from '../buttons/Hambutton';
import PriceFilter from './PriceFilter';
import connectDB from '@/utils/connectDB';
import { posterModel } from '@/models/poster';
import { objectCopy } from '@/utils/helperFunctions';
import { handleQuery } from '@/utils/handleQuery';

const SideBar = async({searchParams}) => {

    const queries = ["All" , "Villa", "Apartment" , "Store" , "Office"]
    const icons = {
        Villa : <RiHome3Line/>,
        Apartment : <MdApartment/>,
        Store : <BiStore/>,
        Office : <GiOfficeChair/>,
        All : <DiGhostSmall/>
    }

    await connectDB()
    const posters = await posterModel.find({} , {price : 1 , _id:0})
    
 
    return ( 
        <>
        <div className={styles.container}>
            <p>Category <MdCategory/></p>

            <div className={styles.categories}> 
            {queries.map((item , index)=>(
                <Link key={index} href={{pathname:"/buy-residential" ,query : handleQuery(item.toLocaleLowerCase() , searchParams) }}> 
                 {icons[item]}{item}
                </Link>
            ))}
            </div>

                <PriceFilter posters ={objectCopy(posters)} />

        </div>

        <div className={styles.HamContainer} >
         <Hambutton searchParams = {searchParams} queries ={queries} icons ={icons}/>
        </div>
        </>
    );
};

export default SideBar;
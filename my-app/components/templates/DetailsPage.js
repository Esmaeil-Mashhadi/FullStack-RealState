import styles from './DetailsPage.module.css'
import { SiHomebridge } from "react-icons/si";
import { AiOutlinePhone } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BiCalendarCheck } from "react-icons/bi";
import {RiHome3Line} from 'react-icons/ri'
import {MdApartment} from 'react-icons/md'
import {BiStore} from 'react-icons/bi'
import{GiOfficeChair} from 'react-icons/gi'
import{FaMoneyCheckDollar} from 'react-icons/fa6'
import ItemList from '../modules/ItemList';
import { sp } from '@/utils/helperFunctions';
import ShareButton from '../buttons/ShareButton';
import DeleteButton from '../buttons/DeleteButton';
import ImageSlider from '../modules/ImageSlider';


const DetailsPage = ({data , role , id}) => {

    const { title, location, description, 
        amenities,rules, realState, phone,price,
        category,constructionDate , images} = data
        
        
    const icons = {
        villa : <RiHome3Line/>,
        apartment : <MdApartment/>,
        store : <BiStore/>,
        office : <GiOfficeChair/>
    }

   
    return (
        <div className={styles.container}>
            <div className={styles.main}>

             <h1>{title}</h1>
             <span><HiOutlineLocationMarker/>
             {location}
             </span>

            <ImageSlider images={images} />

             <h3 className={styles.description}>Description</h3>
             <p>{description}</p>

             <h3>Amenities</h3>
              <ItemList data = {amenities}/>

             <h3>Rules</h3>
              <ItemList data={rules} />

            
             </div>

            <div className={styles.sideBar}>
                <div className={styles.realState}>
                     <p><SiHomebridge/> </p> 
                    <p> realState : <span> {realState} </span></p>
                    <span>
                        <AiOutlinePhone/>
                        {phone}
                    </span>
                </div>
                     <ShareButton/>
                <div className={styles.buttom}>
                    <p>{icons[category]}{category}</p>
                    <p><FaMoneyCheckDollar/>{sp(price)} $</p>
                    <p><BiCalendarCheck/>{constructionDate.toLocaleDateString()}</p>
                </div>
                {role === "Admin" && <DeleteButton id={id}/>}
                
                
            </div>
            
        </div>
    );
};

export default DetailsPage;
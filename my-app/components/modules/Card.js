import styles from './Card.module.css'
import { sp } from '@/utils/helperFunctions'
import Link from 'next/link'
//icons
import {RiHome3Line} from 'react-icons/ri'
import {MdApartment} from 'react-icons/md'
import {BiStore} from 'react-icons/bi'
import{GiOfficeChair} from 'react-icons/gi'
import {GrMapLocation} from 'react-icons/gr'
import {BiRightArrowAlt} from 'react-icons/bi'
import { getTimePassed } from '@/utils/getTimePassed'

const Card = ({data : {category , title , location , price , _id , images , createdAt}}) => {

    const originalDate = new Date(createdAt).toLocaleDateString()
    const today = new Date()
    const posterDate = originalDate
    const timePassed =  getTimePassed(today , posterDate)

   
     
    const icons = {
        villa : <RiHome3Line/>,
        apartment : <MdApartment/>,
        store : <BiStore/>,
        office : <GiOfficeChair/>
    }
    return (
        <div className={styles.container}>
            <p className={styles.title}>{title}{icons[category]}</p>
            <p className={styles.location}> {location}<GrMapLocation/> </p>

            <Link className={styles.imageLink}  href={`/buy-residential/${_id}`}> 
             <img  src={ images?.[0] || images?.[1] || images?.[2] || '/images/noImage.png'} />
            </Link>

            <span>price: {sp(price)} $</span>
            <div className={styles.TimeWatch}>
                <Link className={styles.flesh} href={`/buy-residential/${_id}`}>Watch Ad <BiRightArrowAlt/></Link>
                <p>Date: {timePassed ? timePassed : originalDate}</p>
            </div>
        </div>
    );
};

export default Card;
import Link from 'next/link';
import styles from './CategoryCard.module.css'
import Image from 'next/image';
//icons 
import {RiHome3Line} from 'react-icons/ri'
import {MdApartment} from 'react-icons/md'
import {BiStore} from 'react-icons/bi'
import{GiOfficeChair} from 'react-icons/gi'
const CategoryCard = ({name}) => {
    return (
        <div className={styles.card}>
            <Link href={{pathname:"/buy-residential" , query:{category:name}}}>
                <Image width={410} height={400} src={`/images/${name}.jpg`} alt='image'/>
                <p>{name}
                {name == "apartment" ? <MdApartment/> :
                 name == "office" ? <GiOfficeChair/> :
                 name == "store" ? <BiStore/> :
                 name == "villa" ? <RiHome3Line/> :
                 null}
                </p>
            </Link>
        </div>
    );
};

export default CategoryCard;

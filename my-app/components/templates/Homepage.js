import CategoryCard from '../modules/CategoryCard';
import styles from './HomePage.module.css'

//icons
import {AiOutlineFundView} from 'react-icons/ai'
import {FiCircle} from 'react-icons/fi'
import {FaTreeCity} from 'react-icons/fa6'


const Homepage = () => {
    const services = ["Buy" , "Sell" , "Rent" ,"Mortgage"]
    const cities = ["New York" , "Florida" , "Manhattan" , "California", "Chicago" , "Hawaii"]
    return (
        <div className={styles.container} >
            <div className={styles.banner}>
                <div className={styles.description}>
                    <h1>Unlock Your Dream Home: <span>Seamlessly Buy and Sell Properties</span></h1>
                    <ul>
                        {services.map((item , index)=> <li key={index}>
                            <span><FiCircle/>{item} <FiCircle/></span>
                        </li>)}
                    </ul>
                </div>

            </div>
            <div className={styles.categories}>
                    <CategoryCard name ="villa"/>
                    <CategoryCard name ="apartment"/> 
                    <CategoryCard name ="store"/> 
                    <CategoryCard name ="office"/> 
            </div>
            <div className={styles.cities}>
               <h3>Most viwed cities <AiOutlineFundView/></h3>
               <ul>
                {cities.map(city => <li key={city}>{city}<FaTreeCity/></li>)}
               </ul>
            </div>
        </div>
    );
};

export default Homepage;
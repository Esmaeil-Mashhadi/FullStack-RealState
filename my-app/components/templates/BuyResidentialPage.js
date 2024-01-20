import Card from '../modules/Card';
import SideBar from '../modules/SideBar';
import styles from './BuyResidentialPage.module.css'
const BuyResidentialPage = ({data  , searchParams}) => {
    return (
        <div className={styles.container}>
                <SideBar searchParams ={searchParams}/>
            <div className={styles.main}>
                {!data.length && ((<p className={styles.text}> No posters yet </p>))}
                {data.map(item => <Card key={item._id} data={item}/>)}
            </div>
        </div>
    );
};

export default BuyResidentialPage;
import Link from 'next/link';
import DashboardCard from '../modules/DashboardCard';
import styles from './MyPostersPage.module.css'

const MyPostersPage = ({posters}) => {
    return (
        <div>
        <div className={styles.container} >
        {posters.length ? null :  <p className={styles.text}> You don't have an Ad yet! <Link href="/dashboard/addPoster">want to add one?</Link></p>}
        {posters.map(item => <DashboardCard key={item._id}  data={item}/>)}
    </div>
        </div>
    );
};

export default MyPostersPage;
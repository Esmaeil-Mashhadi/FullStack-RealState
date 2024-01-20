import styles from './DashboardPage.module.css'
import {FaArrowsDownToPeople} from 'react-icons/fa6'
import {MdOutlineDateRange} from 'react-icons/md'
const DashboardPage = ({createdAt}) => {
    return (
        <div className={styles.container}>
            <h3>hey 🤗</h3>
            <p>Register your ad to be seen by thousands of people <FaArrowsDownToPeople/></p>
            <div className={styles.createdAt}><p>Registeration Date <MdOutlineDateRange/></p> <span>{createdAt.toLocaleDateString()}</span></div>
        </div>
    );
};

export default DashboardPage;
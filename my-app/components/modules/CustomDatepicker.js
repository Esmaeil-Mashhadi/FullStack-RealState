import styles from './CustomDate.module.css'
import DatePicker from 'react-multi-date-picker';

const CustomDatepicker = ({addData , setAddData}) => {
    const changeHandler =(e)=>{
        const date = new Date(e);
        setAddData({
            ...addData , constructionDate :date
        })
    }
    return (
        <div className={styles.container}>
            <p>Date of built</p>
            <DatePicker value={addData.constructionDate} onChange={changeHandler}/>
        </div>
    );
};

export default CustomDatepicker;
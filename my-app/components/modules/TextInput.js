import { p2e } from '@/utils/helperFunctions';
import styles from './TextInput.module.css'
const TextInput = ({title , name , addData , setAddData , textarea}) => {

    const changeHandler = (e)=>{
        const {name , value} = e.target
        setAddData({
            ...addData, 
            [name] :p2e(value)
        })

    }

    return (
        <div className={styles.container}>
            <p>{title}</p>
            {textarea ? <textarea type = "text"  name = {name}  value={addData[name]} onChange={changeHandler}/> : 
            <input type = {name === "price" ? "number" : "text"} step={10000} maxLength={30} name={name} value={addData[name]} onChange={changeHandler} />}
        </div>
    );
};

export default TextInput;
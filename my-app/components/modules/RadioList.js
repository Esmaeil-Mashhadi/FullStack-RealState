import styles from './RadioList.module.css'
const RadioList = ({addData , setAddData}) => {

    const {category} = addData
    const changeHandler = (e)=>{
        const {name , value} = e.target
        setAddData({
            ...addData, 
            [name] : value
        })
    }
    return (
        <div className={styles.container}>
            <p>Category</p>
            <div className={styles.main}>

             <div>
                <label htmlFor='villa'>Villa</label>
                <input type='radio'  id='villa' name='category' value="villa" 
                 checked ={category === "villa"} onChange={changeHandler}/>
            </div>

            <div>
                <label htmlFor='apartment'>apartment</label>
                <input type='radio'  id='apartment' name='category' value="apartment" 
                 checked ={category === "apartment"} onChange={changeHandler}/>
            </div>

            <div>
                <label htmlFor='store'>store</label>
                <input type='radio'  id='store' name='category' value="store" 
                 checked ={category === "store"} onChange={changeHandler}/>
            </div>

            <div>
                <label htmlFor='office'>office</label>
                <input type='radio'  id='office' name='category' value="office" 
                 checked ={category === "office"} onChange={changeHandler}/>
            </div>

            </div>
          
        </div>
    );
};

export default RadioList;
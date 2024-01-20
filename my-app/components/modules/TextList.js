import styles from './TextList.module.css'
import {MdOutlineLibraryAdd} from 'react-icons/md'
import {AiOutlineDelete} from 'react-icons/ai'
import { useEffect, useState } from 'react';

const TextList = ({title, addData , setAddData ,type }) => {

    const [disable , setDisable] = useState(false)

    const addHandler = ()=>{
           setAddData({
            ...addData , [type] : [...addData[type]  , ""]
           })
    }

    const changeHandler = (e , index)=>{
       const {value} = e.target
       const list = [...addData[type]]
       list[index] = value

       setAddData({
        ...addData , [type] : list

       })
      
       
    } 

    const deleteHandler = (index)=>{
     addData[type].splice(index , 1)
     setAddData({
        ...addData , [type] :[...addData[type]]
     })
    }
   

    useEffect(()=>{
        if(addData[type]?.length>3){
           setDisable(true)
        } else{
            setDisable(false)
        }

    },[addData])

  

   
    return (
        <div className={styles.container}>
            <p>{title}</p>

            <button className={styles.add} onClick={addHandler} disabled={disable} title={disable ?"only four amenties allowed" : ""}> Add <MdOutlineLibraryAdd/></button>

            {addData[type]?.map((item , index)=> (
                <div key={index} className={styles.card}> <input type='text' value={item} onChange={e => changeHandler(e , index)} /> 
                <button onClick={()=>deleteHandler(index)} >Delete <AiOutlineDelete/></button>
                </div>
            ))}
           
        </div>
    );
};

export default TextList;
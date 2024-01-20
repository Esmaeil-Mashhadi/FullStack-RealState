'use client'
import { useEffect, useState } from 'react';
import styles from './imageSlider.module.css'
import { AiOutlineCloseSquare } from "react-icons/ai";
import { FaChevronRight } from "react-icons/fa";



const ImageSlider = ({images}) => {
    const [show , setShow] = useState(false)
    const [number , setNumber] =useState(0)

    const showPopUp = ()=>{
        setShow(true)
    }



    const nextHandler = ()=>{
        setNumber((prevNumber) =>{
            if(prevNumber > (images.length - 2)){
                return prevNumber = 0
            }
            return prevNumber + 1
        })
    }

    const previousHandler = ()=>{
        setNumber((prevNumber) =>{
            if(prevNumber < 1){
                return prevNumber = (images.length -1)
            }
            return prevNumber - 1
        })
    }

    useEffect(()=>{
       
           window.addEventListener('click' , (e)=>{
            if(!e.target.closest(`.${styles.showPop}`) && !e.target.closest(`.${styles.imageContainer}`)){
                setShow(false)
            }
           }) 
         
    },[])  

    return (
     <div className={styles.container} > 
        {!images.length  ? <img className={styles.noImage} src='/images/noImage.png' /> : 
        <div className={styles.imageContainer}>
        <button onClick={nextHandler} className={styles.next}> <FaChevronRight/> </button>
        <img onClick={showPopUp} src={images[number] || images[1] || images[2]} />
        <button onClick={previousHandler} className={styles.previous}> <FaChevronRight/></button>
        </div>}

        {show && images.length && 
         <div  className={styles.popUpContainer}>
         <div className={styles.showPop}>
            <img className={styles.mainImage} src={images[number] || images[1] || images[2]} />
            <span onClick={()=>setShow(false)}> <AiOutlineCloseSquare/></span>

            <div className={styles.tinyImages} >
            {images.map((image , index) => {
            return images[index] &&  <img key={index} onClick={()=>{setNumber(index)}} src={ images[index]} />
            })}
            </div> 
         </div>
           
        </div>}

    </div>
    );
};

export default ImageSlider;
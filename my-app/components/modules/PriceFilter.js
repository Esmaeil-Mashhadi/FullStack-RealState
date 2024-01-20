'use client'
import {  useEffect, useState } from 'react';
import styles from './PriceFilter.module.css'
import { getMinAndMaxPrice, sp } from '@/utils/helperFunctions';
import { GiPriceTag } from "react-icons/gi";

import { useRouter, useSearchParams } from 'next/navigation';

const PriceFilter = ({posters}) => {


   const {minPrice , maxPrice} = getMinAndMaxPrice(posters)
   const router = useRouter()

   const searchParams = useSearchParams()
  
    const [minValue , setMinValue] = useState(minPrice)
    const [maxValue , setMaxValue] = useState(maxPrice)

    const priceGap = 100000

     
    const changeMinHandler = (e)=>{
        if((maxValue - e.target.value) < priceGap ){
            setMinValue(minValue)
        }else{
            setMinValue(e.target.value)
        }
    }
    const changeMaxHandler = (e)=>{
        
        if((e.target.value - minValue) < priceGap){
            setMaxValue(maxValue)
        }else{
            setMaxValue(e.target.value)
        }
    }

    const minPercent = Math.ceil((minValue/maxPrice)*100)
    const maxPercent = 100 - Math.ceil((maxValue / maxPrice) * 100);

    const styleObject = {
        '--minVar' : minPercent + "%",
        '--maxVar' : maxPercent + "%"
    }
 
    const searchHandler = ()=>{
        
        const category = searchParams.get('category');
        if(category){
            const newParams =  `buy-residential?min=${minValue}&max=${maxValue}&category=${category}`
            router.push(newParams)
        }else{
            const url = `buy-residential?min=${minValue}&max=${maxValue}`
            router.push(url)

        }
    }

    useEffect(()=>{
        router.push("/buy-residential")
    },[])
   

    return (
        <div className={styles.priceFilter}>
        <div className={styles.priceContainer}>
            <h3>Price filter <GiPriceTag/> </h3>
            <div>
                <label>Min:</label>
                <input type='text' step={priceGap} placeholder='min price'
                     min={minValue} max={maxValue} value={sp(minValue)}  
                     disabled={true} onChange={changeMinHandler}/>
            </div>
            <div>
                <label>Max:</label>
                <input type='text' step={priceGap} placeholder='max price' 
                    min={minValue} max={maxValue} value={sp(maxValue)}
                    disabled={true} onChange={changeMaxHandler}/>
            
            </div>
        </div>
        <div className={styles.inputRange}>
            <input type='range' min={minPrice} max={maxPrice} value={minValue} onMouseUp={searchHandler} onChange={changeMinHandler}/>
            <input type='range' min={minPrice} max={maxPrice} value={maxValue} onMouseUp={searchHandler} onChange={changeMaxHandler}/>
        </div>
        
        <div className={styles.progress}>
             <div style={styleObject} className={styles.bar}></div>
        </div>
        

        </div>
    );
};

export default PriceFilter;
"use client"
import {RxHamburgerMenu} from 'react-icons/rx'
import {RxCross2} from 'react-icons/rx'
import styles from './HamButton.module.css'

import { useEffect, useState } from "react";
import Link from 'next/link'
import { handleQuery } from '@/utils/handleQuery';

const Hambutton = ({queries, icons , searchParams }) => {
    const [hamShow, setHamshow]= useState(false)
    const [n , setN]= useState(-150)
    const move  = {
        "--move": `${n}%`,
    }

    const showHandler = ()=>{
        setHamshow(!hamShow)
    }

    useEffect(()=>{
        hamShow ?setN(0):setN(-150)
    },[hamShow])


    return (
        <div className={styles.container}>
         <span onClick={showHandler}>{hamShow ? <RxCross2/> : <RxHamburgerMenu/>}</span>   
      
         <div style={move} className={styles.HamSideBar}> 
          {queries.map((item , index)=>(
                <Link onClick={()=> setHamshow(false)} key={index} href={{pathname:"/buy-residential" ,query : handleQuery(item.toLocaleLowerCase()) , searchParams }}> 
                 {icons[item]}: {item}
                </Link>
            ))}

        </div>
        </div>
    );
};

export default Hambutton;
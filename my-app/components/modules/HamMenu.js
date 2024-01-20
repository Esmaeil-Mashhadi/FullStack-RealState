'use client'
import { useState } from 'react';
import styles from './HamMenu.module.css'
import SearchModule from './SearchModule';
import Link from 'next/link';

const HamMenu = ({searchPosters}) => {
    const [show , setShow] = useState(false)
    const hamClick  = ()=>{
        setShow(!show)
    }

    const styleObject = {
        firstChild: {
            '--transform' : `${show ?  "rotate(45deg)" : "rotate(0deg)"}`
        },
        middleChild : {
            '--transform' : `translateX(-100%)`,
            '--opacity' : `${show ? 0 : 1}`
        },
        lastChild :{
            '--transform' : `${show ?  "rotate(-45deg)" : "rotate(0deg)"}`

        }
    }
    
    return (
        <div className={styles.hamContainer}>
    
            <div  onClick={hamClick} className={styles.hamMenu}>

                <span style={show ? styleObject.firstChild : null}></span>
                <span style={show ? styleObject.middleChild :null}></span>
                <span style={show ? styleObject.lastChild : null}></span>
        
            </div>

            
            <div style={{transform : show ?  "translateY(0%)"  : "translateY(-120%)"}} className={styles.Menu}>
            <ul>

                <SearchModule setShow = {setShow} searchPosters={searchPosters} />

                <li>
                    <Link onClick={()=>setShow(false)} href="/buy-residential">Buy residentials</Link>
                </li>
                
                <li>
                        <Link onClick={()=>setShow(false)} href="/">Home</Link>
                </li>

                
             
           </ul>
            
            </div>

        </div>

    );
};

export default HamMenu;
'use client'
import React, { useEffect, useState } from 'react';
import styles from './SearchModule.module.css'
import Link from 'next/link';
import { useRouter } from 'next/navigation';


const SearchModule = ({searchPosters , setShow}) => {


    const [value , setValue] = useState('')
    const regex = new RegExp(value , 'gi')
    const router = useRouter()


    
    
    const searchHandler = async()=>{
        setValue('')
        const url = `/buy-residential?search=${value}`
        router.push(url)
 
    }

          

    const changeHanlder = (e)=>{
        setValue(e.target.value)

    }
     
    useEffect(()=>{
        window.addEventListener('click' , (e)=>{
            if(!e.target.closest(`${styles.searchContainer}`)){
                setValue('')
            }
        })
    },[value])

    return (
    <div>
        <div className={styles.searchContainer}>
            <input value={value} onChange={changeHanlder} placeholder='what are you looking for ? ...'/>
            <button disabled ={!value} onClick={searchHandler}>Search</button>

            <div style={!value ? {display:'none'} : null } className={styles.searchResult}>   
              { searchPosters.map(item => {
                const {title , location  , realState} = item
                
                 return value &&  title.match(regex) ?  <Link key={item._id} href={`/buy-residential/${item._id}`} onClick={()=>setShow(false)}>{title}</Link>
                 :location.match(regex) ? <Link onClick={()=>setShow(false)} key={item._id}  href={`/buy-residential/${item._id}`}>{location}</Link> 
                 :realState.match(regex) ? <Link onClick={()=>setShow(false)} key={item._id}  href={`/buy-residential/${item._id}`}>{realState}</Link> : null
            
            })}
            </div>
      
        </div>
    </div>
    );
};

export default SearchModule;
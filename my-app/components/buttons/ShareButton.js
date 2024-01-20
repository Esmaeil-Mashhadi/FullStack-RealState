"use client"
import { useEffect, useState } from 'react';
import styles from './ShareButton.module.css'
import {CopyToClipboard} from 'react-copy-to-clipboard';

import {LuShare2} from 'react-icons/lu'
import { Toaster, toast } from 'react-hot-toast';

const ShareButton = () => {
     const[url , setUrl] = useState("")

     useEffect(()=>{
        setUrl(window.location.href)
     },[])

     const copyHandler = ()=>{
      toast.success("copied successfully")
     }
    return (
      <>
        <CopyToClipboard text={url} onCopy={copyHandler}>
        <div  className={styles.container} >
           <LuShare2/> Share
        </div>
        </CopyToClipboard> 
        <Toaster/>
      </>
    );
};

export default ShareButton;
"use client"
import { signOut } from 'next-auth/react';
import styles from './LogoutButton.module.css'
import {FiLogOut} from 'react-icons/fi'

const LogoutButton = ({signOutHandler}) => {
    const Exit = async()=>{
        await signOutHandler()
        await signOut() 
    }
    return (
        <button className={styles.button} onClick={Exit}>
            Log out <FiLogOut/>
        </button>
    );
};

export default LogoutButton;
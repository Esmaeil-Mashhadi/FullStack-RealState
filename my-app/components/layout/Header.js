"use client"
//icons
import {RxDashboard} from 'react-icons/rx'
import {FiLogIn} from 'react-icons/fi'
import styles from './Header.module.css'
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import SearchModule from '../modules/SearchModule';
import HamMenu from '../modules/HamMenu';


const Header = ({searchPosters , session}) => {
    const permission = useSession()?.status == "authenticated" || session?.status == "authenticated"
    return (
        <header className={styles.header}>
           {permission ? 
           <Link href="/dashboard" className={styles.dashboard}>
           Dashboard <RxDashboard/>
             </Link> :
           
           <div className={styles.login}>
                <Link href="/signup">
                    <span>Login</span><FiLogIn/>
                </Link>
            </div> 
            
            }


            <div className={styles.rightSide}>
                <ul>
                    <SearchModule searchPosters={searchPosters} />
                    <li>
                        <Link href="/">Home</Link>
                    </li>

                    <li>
                        <Link href="/buy-residential">Buy residentials</Link>
                    </li>
                     
                </ul>
            </div>

            <div className={styles.HamMenu}>
            <HamMenu searchPosters={searchPosters} />
            </div>

        </header>
    );
};

export default Header;
"use client"

import {useState } from "react";
import styles from './Login.module.css'
import Link from "next/link";
import {signIn} from "next-auth/react";
import {  useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";


const LoginPage = () => {
    const [data , setData] = useState({
        email:"",
        password:"",
    })


    const router = useRouter()
    const {email ,password } = data
    
    const changeHandler= (e)=>{
        const {name , value}  = e.target
        setData({
            ...data ,
            [name] : value
        })
    }

    const loginHandler = async(e)=>{
        e.preventDefault()
        const res = await signIn("credentials" , {
            email , password , redirect:false
        })

        if(res.error){
            toast.error(res.error)
        }else{
            toast.success('welcome back')
            setTimeout(() => {
                router.push("/")
            }, 2000);
        }
    }


    return (
        <>
        <div className={styles.formInput}>
            <h4>Register Form</h4>
              <form className={styles.formContainer}>
                <div >
                    <input type="text" name="email" value={email} onChange={changeHandler} />
                  <label>Email</label>
                </div>

                <div>
                    <input type="text" name="password" value={password} onChange={changeHandler} />
                  <label>password</label>
                </div>

                <button onClick={loginHandler}>Login</button>
                  
               </form>

               <div className={styles.already}>
               dont have an account?  <Link href="signup"> Sign up</Link>
            </div> 
            
        </div>
        <Toaster />

        </>
    );
};

export default LoginPage;
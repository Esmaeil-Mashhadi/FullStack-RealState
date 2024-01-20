"use client"

import { useEffect, useState } from "react";
import styles from './Signup.module.css'
import Link from "next/link";
import { validate } from "@/utils/validation";
import { useRouter } from "next/navigation";
import {ThreeDots} from 'react-loader-spinner'
//icons 
import {TbProgressCheck} from 'react-icons/tb'
import toast, { Toaster } from "react-hot-toast";
const SignUpPage = () => {
    const [data , setData] = useState({
        email:"",
        password:"",
        confirm :"",
    })

    const [focus , setFocus] = useState({
        email :false,
        password :false,
        confirm : false
    })

    const [errorMessage , setErrorMessage] = useState("")
    const [loading , setLoading] = useState(false)

    const router = useRouter()

   const disabling = Object.keys(errorMessage).length


    const {email ,password , confirm} = data

    const changeHandler= (e)=>{
        const {name , value}  = e.target
        setData({
            ...data,
            [name] : value
        })
    }

    const focusHandler = (e)=>{
        setFocus({
            ...focus,
        [e.target.name] : true
      })

    }


    const signUpHandler = async (e)=>{
       e.preventDefault();
        setLoading(true)
       const res = await fetch('http://localhost:5000/register' ,{
        method :"POST" , body :JSON.stringify({email , password}) , headers :{"Content-Type" : "application/json"} , credentials:'include'
       })
       const data = await res.json()
       if(data.status == 201){
         toast.success('you signed up successfully')
         setTimeout(()=>{
           router.push("/dashboard") 
         },2000)
     
       } else {
         setLoading(false)
         toast.error(data.data.message)
       }
      
    }


    useEffect(()=>{
      const error =  validate(data)
     setErrorMessage(error)

    },[data])

    return (
        <> 
        <div className={styles.formInput}>
            <h4>Register Form</h4>
              <form className={styles.formContainer}>
                <div >
                    <input type="text" name="email" value={email} onChange={changeHandler} 
                    onFocus={focusHandler} className={errorMessage.email && focus.email ? styles.errorBoarder : focus.email && !errorMessage.email ? styles.validInput :"" }  />
                  <label>Email</label>
                  <span className={styles.error}> {focus.email && errorMessage.email }</span>
                  {focus.email && !errorMessage.email && <TbProgressCheck/>}
                
                </div>

                <div>
                    <input type="text" name="password" value={password} onChange={changeHandler} onFocus={focusHandler} className={errorMessage.password && focus.password ? styles.errorBoarder : focus.password && !errorMessage.password ? styles.validInput :"" }  />
                  <label>password</label>
                  <span className={styles.error}> {focus.password && errorMessage.password }</span>
                  {focus.password && !errorMessage.password && <TbProgressCheck/>}
                </div>

                <div>
                    <input type="text" name="confirm" value={confirm} onChange={changeHandler}  onFocus={focusHandler} className={errorMessage.confirm && focus.confirm ? styles.errorBoarder : focus.confirm && !errorMessage.confirm ? styles.validInput :"" } />
                  <label>Confirm password</label>
                  <span className={styles.error}> {focus.confirm && errorMessage.confirm }</span>
                  {focus.confirm && !errorMessage.confirm && <TbProgressCheck/>}
                </div>
                  {loading  ? <ThreeDots wrapperClass={styles.dotsContainer} color="green" wrapperStyle={{width:"100px" , margin:"auto" , position:"absolute" , bottom:"70px"}} /> :
                  <button onClick={signUpHandler} disabled ={disabling} className={disabling ? styles.fade : styles.signButton} title={disabling ? "fill all the forms to sign up": ""} >Sign up</button>}
                
               </form>

               <div className={styles.already}>
                Already Have an Account ?  <Link href="login"> Login</Link>
            </div> 
    
        </div>
       
        <Toaster />
        
        </>
    );
};

export default SignUpPage;
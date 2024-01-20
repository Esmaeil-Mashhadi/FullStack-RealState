"use client"
import { Toaster, toast } from 'react-hot-toast';
import styles from './DeleteButton.module.css'
import { useRouter } from 'next/navigation';




const DeleteButton = ({id}) => {

    const router = useRouter()

const removeHandler = async()=>{
    const res = await fetch(`/api/poster/${id}` , {
        method:"DELETE"
    })

    const data = await res.json()
    if(data.error){
        toast.error(data.error)
    } else {
        toast.success(data.message)
        setTimeout(() => {
            router.push("/buy-residential")
            router.refresh()
        }, 500);
    }
}


    return (
        <>
         <button onClick={removeHandler} className={styles.remove} title='available for Admin'>
            Remove Ad
        </button>
        
        <Toaster/>
        </>
       
        
    );
};

export default DeleteButton;
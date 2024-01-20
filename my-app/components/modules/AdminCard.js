"use client"
import { Toaster, toast } from 'react-hot-toast';
import styles from './AdminCard.module.css'
import Card from './Card';
import { useRouter } from 'next/navigation';

const AdminCard = ({data}) => {
   
    const router =useRouter()

    const addHandler = async()=>{
        const res = await fetch(`/api/poster/${data._id}` ,{
            method:"PATCH" 
        })

        const result = await res.json()
        if(!result.error){
            toast.success(result.message)
            setTimeout(() => {
                router.refresh()
            }, 1000);
        } else {
            toast.error(result.error)
        }
    }

  
    const deleteHandler = async()=>{
        const res = await fetch(`/api/poster/${data._id}` , {
            method:"DELETE"
        })
        const result = await res.json()
        if(result.error){
            toast.error(result.error)
        }else{
            toast.success(result.message)
            setTimeout(() => {
                router.refresh()
            }, 500);
        }
    }

    return (
        <div className={styles.container}>

            <div className={styles.card}>
                 <Card data ={data} />
                 <div className={styles.buttons}>
                    <button onClick={deleteHandler}>Reject Ad
                    </button>
                    <button onClick={addHandler}>Accept Ad</button>
                 </div>
            </div>

             <Toaster/>
        </div>
    );
};

export default AdminCard;
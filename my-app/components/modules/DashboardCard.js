"use client"
import styles from './DashboardCard.module.css'
import Card from "./Card";

//icon
import {FiEdit} from 'react-icons/fi'
import {BsTrash} from 'react-icons/bs'
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast';

const DashboardCard = ({data}) => {
      const router = useRouter()

    const editHandler = async()=>{
      router.push(`/dashboard/my-posters/${data._id}`)
    }

    const deleteHandler = async()=>{
      const res = await fetch(`/api/poster/${data._id}` , {
        method :"DELETE"
      })
      const result = await res.json()
       if(result.error){
        toast.error(result.error)
       } else{
        toast.success(result.message)
        router.refresh()
       }

    }

    return (
        <div className={styles.container}>
          <Card data ={data}/>
          <div className={styles.buttons}>
            <button onClick={editHandler}>Edit Ad <FiEdit/> </button>
            <button onClick={deleteHandler}>Remove <BsTrash/></button>
        </div>
        <Toaster/>
          
        </div>
    );
};

export default DashboardCard;
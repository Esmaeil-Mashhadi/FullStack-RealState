"use client"
import { useEffect, useState } from 'react';
import styles from './AddPosterPage.module.css'
import TextInput from '../modules/TextInput';
import RadioList from '../modules/RadioList';
import TextList from '../modules/TextList';
import CustomDatepicker from '../modules/CustomDatepicker';
import { Toaster, toast } from 'react-hot-toast';

//icon
import {MdAddHomeWork} from 'react-icons/md'
import { ThreeDots } from 'react-loader-spinner';
import { useRouter } from 'next/navigation';
import ImageInput from '../modules/ImageInput';
import { useSession } from 'next-auth/react';

const AddPosterPage = ({data}) => {
    const [addData , setAddData] = useState({
        title:"",
        description:"",
        location:"",
        phone:"",
        price:"",
        realState:"",
        constructionDate :new Date(),
        category:"",
        rules:[],
        amenities:[],
    })

    const [images , setImages] = useState([])
    const [imageSrc , setImageSrc] = useState([])

    const sessionToken =  useSession()
 
    const [loading , setLoading] = useState(false)
    const router = useRouter()

    const submitHandler = async ()=>{
        setLoading(true)
        const form = new FormData()
         images.forEach(image => {
            form.append('images' , image)
         })
        Object.keys(addData).map(item => {
         form.append(item , addData[item])
        })

        form.append('session' , JSON.stringify(sessionToken))


        const res = await fetch("http://localhost:5000/addPoster" , {
            method :"POST" , body : form  , credentials:"include"
        })
        const data = await res.json()
        setLoading(false)
        if(data.statusCode != 201){
            toast.error(data.data.message)
        } else{
            toast.success(data.data.message)
            setAddData({
                title:"",
                description:"",
                location:"",
                phone:"",
                price:"",
                realState:"",
                constructionDate:new Date(),
                category:"",
                rules:[],
            })

            setImageSrc([])
            setImages([])
           
        }
        router.refresh()
    }
  

    const editHandler = async ()=>{
        setLoading(true)
        const form = new FormData()
        Object.keys(addData).forEach(key => {

            const convertableFeilds = ['rules' , 'amenities']
            if(convertableFeilds.includes(key)){
                const stringArray = JSON.stringify(addData[key])
                form.append(key , stringArray)
            }else{
                form.append(key , addData[key])
            }
        })
        
        images.forEach((image , index) => {

            if(typeof(image) =='number'){
                form.append('removedImage' , image)
            }else if(image && typeof(image) !="string"){
                form.append('images' , image)
                form.append('imageIndex' , index) 
            }
               
            
        })

 
        const res = await fetch(`http://localhost:5000/updatePoster/${data._id}` ,{
            method :"PATCH" , body :form 
        }) 


        const result = await res.json() 
        setLoading(false)
        if(result.statusCode !=200){
            toast.error(result.data.message)
        } else {
            toast.success(result.data.message)
            router.refresh()
            setTimeout(() => {
                router.push("/dashboard/my-posters")
            }, 2000);
        }
    }

     useEffect(()=>{
       if(data){
        setAddData(data)
        setImageSrc(data.images)
       }
     },[])


    return (
        <div  className={styles.container}>
            <h3>{data ? "edit your Ad" : "Register your Add"}</h3>

            <TextInput title="Ad title" name="title" addData={addData} setAddData={setAddData} />
            <TextInput title="description" name="description" textarea={true} addData={addData} setAddData={setAddData} />
            <TextInput title="location" name="location"  addData={addData} setAddData={setAddData} />
            <TextInput title="phone" name="phone"  addData={addData} setAddData={setAddData} />
            <TextInput title="price($)" name="price"  addData={addData} setAddData={setAddData} />
            <TextInput title="realState" name="realState"  addData={addData} setAddData={setAddData} />
            <RadioList addData={addData} setAddData={setAddData}/>
            <TextList title="welfare amenities" addData={addData} setAddData={setAddData} type="amenities" />
            <TextList title="rules" addData={addData} setAddData={setAddData} type="rules" />
            <ImageInput imageSrc={imageSrc}  setImageSrc={setImageSrc} images={images} setImages ={setImages} data={data} />

            <CustomDatepicker addData={addData} setAddData={setAddData}/>
            <Toaster toastOptions={{success:{duration:5000}}}/>
       
             {loading ? <ThreeDots wrapperStyle={{margin:"auto"}}/> :  <button className={styles.submit} onClick={data ? editHandler : submitHandler} ><MdAddHomeWork/>{data? "Edit":"Submit"} </button>}
   
        </div>


    ); 
};

export default AddPosterPage;
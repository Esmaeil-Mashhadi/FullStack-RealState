'use client'
import styles from './ImageInput.module.css'
import toast, { Toaster } from 'react-hot-toast';


const ImageInput = ({images , setImages , imageSrc , setImageSrc , data}) => {
// the data im using condition on it is prior data , it exist when im updating a poster 

    const uploadHandler = (index , event)=>{

        const fileInput = document.createElement('input')
        fileInput.type = 'file'
        fileInput.addEventListener('change' , (e)=>{
                const file = e.target.files[0]
                const reader = new FileReader()
                const validExt = ['png' , 'jpg' , 'jpeg' , 'webp']
                const ext = file.type.split('/')[1]
                if(!validExt.includes(ext)){
                    return toast.error('format is not supproted')
                }

           
                
                reader.onload = (e)=>{

                    const dataURL = e.target.result;
                    const imageArray = [...imageSrc]
                    imageArray[index] = dataURL
                    setImageSrc([...imageArray])

                    const fileArray = [...images]
                     fileArray[index] = file
                     setImages([...fileArray])
                }

                reader.readAsDataURL(file)
        })

        fileInput.click()
    }


 const removeHandler = async(removeIndex)=>{
            const removedImages = [...imageSrc]
            removedImages[removeIndex] = removeIndex
            setImageSrc(removedImages)
            setImages(removedImages)

    } 

    return ( 
        <div className={styles.container}>
        <p>upload image</p> 
        <div className={styles.uploadContainer}>
         {[...Array(3)].map((_,index)=>
            typeof(imageSrc[index]) === 'number'  || !imageSrc[index]  ?  
            (<button key={index} onClick={()=>uploadHandler(index)}>+</button>) 

            : <div key={index} className={styles.imageContainer}>
             <img data-ele = "img"  onClick={(event)=>uploadHandler(index , event)} className={styles.imageTag} src={ imageSrc[index]} />
             <span className={styles.remove} onClick={()=>removeHandler(index)}>remove Image</span> 
            </div>)}
        </div>
        <Toaster />
        </div>
    );
};

export default ImageInput;
import BuyResidentialPage from "@/components/templates/BuyResidentialPage";
import { posterModel } from "@/models/poster";

const BuyResidential = async ({searchParams}) => {


                const res = await fetch('http://localhost:3000/api/poster', {cache:"no-store"})
                //just testing ssr 
                const result = await res.json()
             


            const {min , max} = searchParams
            const {category} = searchParams

            let finalData = result.data

            //just showcasing node js querying for data base in case we have larger data 
            if(min && max && category){
                finalData = await posterModel.find({
                    $and :[
                        {price:{$gte : min , $lte:max}} ,
                        {category}
                        
                    ]
                })
            }


            
            if(min && max){
                const price = await posterModel.find({price : {$gte:min , $lte:max}})
                finalData = price
            }


        
            if(searchParams.search){
                const {search} = searchParams
                const regex = new RegExp(search , 'gi')
                
                finalData = finalData.filter(item =>  (item.title).match(regex) || (item.realState).match(regex) || (item.location).match(regex))
            }
            if(searchParams.category){
                finalData = finalData.filter(item => item.category === category)
                
            }

           

    return (
        <div>
            <BuyResidentialPage data = {finalData} searchParams={searchParams}/>
        </div>
    );
};

export default BuyResidential;
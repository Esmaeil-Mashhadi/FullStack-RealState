import AddPosterPage from "@/components/templates/AddPosterPage";
import { posterModel } from "@/models/poster";
import connectDB from "@/utils/connectDB";
import { objectCopy } from "@/utils/helperFunctions";

const Edit = async({params :{posterID}}) => {
      await connectDB()
      const posters = await posterModel.findOne({_id : posterID})
      if(!posters) return  <h3>Something went wrong</h3>
    return (
        <div>
                
               <AddPosterPage data = {objectCopy(posters)} />
        </div>
    );
};

export default Edit;
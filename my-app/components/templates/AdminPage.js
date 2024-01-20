import AdminCard from "../modules/AdminCard";

const AdminPage = ({posters}) => {
    
    return (
        <div>
            {posters.length ? null : <p style={{margin:'55px'}}>There is no posters for confirming yet !</p>}
            {posters.map(item =>  <AdminCard key={item._id} data= {item} />)}
        </div>

    );
};

export default AdminPage;
const ItemList = ({data}) => {

    return (
        <div>
             {data.length ? <ul>{data.map(item=> <li key={item._id}>
                {item}
             </li>)}</ul> : "Nothing mentioned yet"}
        </div>
    );
};

export default ItemList;
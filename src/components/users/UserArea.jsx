import { useUserContext } from "../../context/userContext";
import AddProduct from "../product/AddProduct";

const UserArea = ({handleProducts}) => {

    const user = useUserContext();

    if(!user.isLoggedIn){
        return(<></>);
    }

    return (
        <div className="row mb-4">
            <div className="col-12 col-sm-6">
                <h2>Welcome, {user.user_data.user.name}!</h2>
            </div>
            <div className="col-12 col-sm-6 d-flex justify-content-sm-end">
                <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#addProductModal">Add new product</button>
            </div>
            <AddProduct handleProducts={handleProducts}/>
        </div>
        
    );
}
 
export default UserArea;
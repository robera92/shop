import { Link } from "react-router-dom";
import { useUserContext } from "../../context/userContext";

const Product = ({product, handleProducts}) => {

    const user = useUserContext();

    const handleDeleteProduct = (productId) =>{
        handleProducts( {action: 'delete', productId: productId } );
    }

    let image_url = product.image_url ? product.image_url : 'https://placehold.co/200x200.png';

    if(user.isLoggedIn){
        return (
            <div className="row justify-content-center mb-3 border border-secondary rounded" key={product.id}>

            <div className="col-lg-4 col-md-12">
              <div className="text-center">
                <img src={image_url} className="rounded img-thumbnail image-fluid m-1"/>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 d-flex flex-column justify-content-evenly">
            <h3 className="card-title d-flex justify-content-between">{product.title} <span>€ {new Intl.NumberFormat().format(product.price)}</span></h3>
            <p className="card-text fs-4">{product.description && product.description.length > 100 ? `${product.description.substring(0, 100)}...` : product.description }</p>
            </div>

            <div className="col-lg-4 col-md-6 d-flex flex-column justify-content-center">
                <div className="d-grid gap-2 d-md-block">  
                  <Link to={`/product/${product.id}`} className="btn btn-primary m-1">View details</Link>
                  <button className="btn btn-secondary m-1">Edit product</button>
                  <button className="btn btn-warning m-1" onClick={ ()=> { if(window.confirm('Are you sure to delete?')){ handleDeleteProduct(product.id, user.user_data.user.access_token); } } }>Delete product</button>
                </div>
            </div>

          </div>
      );
    }

    return (
        <div key={product.id} className="col-lg-3 col-md-6 col-sm-6 d-flex">
        <div className="card w-100 my-2 shadow-2-strong">
          <img src={image_url} className="card-img-top image-fluid"/>
          <div className="card-body d-flex flex-column">
            <h5 className="card-title d-flex justify-content-between">{product.title} <span>€ {new Intl.NumberFormat().format(product.price)}</span></h5>
    
            <p className="card-text">{product.description && product.description.length > 100 ? `${product.description.substring(0, 100)}...` : product.description }</p>
            <div className="card-footer p-3 mt-auto text-center">
              <Link to={`/product/${product.id}`} className="btn btn-primary">View details</Link>
            </div>
          </div>
        </div>
      </div>
    );
}
 
export default Product;
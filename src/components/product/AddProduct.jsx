import { useState, useRef } from "react";
import { useUserContext } from "../../context/userContext";
import insertProduct from "../../services/insertProduct";

const AddProduct = ({handleProducts}) => {

    const user = useUserContext();

    const initialState = {
      title: '',
      price: '',
      description: '',
      image: '',
      user_id: user.user_data.user.id,
      access_token: user.user_data.access_token
    };

    const [product, setProduct] = useState(initialState);

    const [alert, setAlert] = useState('');
    const closeModal = useRef(0);

    const handleChange = (event) => {
      setAlert(null);
      let { name, value } = event.target;
      if(event.target.files)value = event.target.files[0];
      setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      try{
         const response = await insertProduct(product);
          if(response.status === true){
              handleProducts({action: 'add', data: response.data });
              setProduct(initialState);
              e.target.image.value = null;
              closeModal.current.click();
          }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400){
            setAlert(Object.values(error.response.data.errors)[0]);
          } else {
            setAlert('Server responded with non-2xx status:', error.response.data);
          }
        } else if (error.request) {
          setAlert('No response received from the server');
        }
      }


  };



    return (
        <div className="modal fade" id="addProductModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Add new product</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <form onSubmit={handleSubmit}>
              <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" name="title" autoComplete="off" className="form-control" id="title" value={product.title} onChange={handleChange}/>
               </div>
              <div className="mb-3">
                <label htmlFor="price"  className="form-label">Price</label>
                <input type="number" min="0.00" max="99999999" step="0.01" name="price" autoComplete="off" value={product.price} onChange={handleChange} className="form-control" id="price"/>
               </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea type="text" name="description" rows="10" autoComplete="off" className="form-control" value={product.description} onChange={handleChange} id="description"></textarea>
               </div>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">Image</label>
                <input type="file" name="image" autoComplete="off" className="form-control" id="image" onChange={handleChange} accept="image/png, image/jpeg" />
               </div>
             
             {alert && <div className="d-block"><div className="alert alert-danger mb-0" role="alert">{alert}</div></div>}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" ref={closeModal} data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary">Save changes</button>
              </div>
              </form>
              
            </div>
          </div>
        </div>
    );
}
 
export default AddProduct;
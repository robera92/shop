
    import { useParams } from "react-router-dom";
    import { useEffect, useState } from "react";
    import { useUserContext } from "../../context/userContext";
    import NotAllowed from "../other/NotAllowed";
    import getSingleProduct from "../../services/getSingleProduct";
    import editSingleProduct from "../../services/editProduct";

const EditProduct = () => {

        const initialState = {
            title: '',
            price: '',
            description: '',
            image_url: '',
            access_token: null
        };

        const user = useUserContext();
        const params = useParams();
        const [product, setProduct] = useState(initialState);
        const [alert, setAlert] = useState('');
        const [sucess, setSucess] = useState('');
        const [productTitle, setProductTitle] = useState('');

        async function fetchProduct(data) {
            let response = await getSingleProduct(data);
            setProduct(response.data);
            setProductTitle(response.data.title);
        }
    
        useEffect(() => {
            const productId = params.id;
            if(user.isLoggedIn)fetchProduct({productId: productId, access_token: user.user_data.access_token})
        }, [user]);
    
        if(!user.isLoggedIn) return <NotAllowed/>;


     
        const handleChange = (event) => {
          setAlert(null); setSucess(null);
          let { name, value } = event.target;
          if(event.target.files)value = event.target.files[0];
          setProduct({ ...product, [name]: value });
        };
    
        const handleSubmit = async (e) => {
          e.preventDefault();
    
          try{
             const response = await editSingleProduct({...product, productId: product.id, access_token: user.user_data.access_token});
              if(response.status === true){
                  setProductTitle(response.data.title);
                  setSucess('Updated, thank you!');
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
     
    
        return (<>
            <section className="">
                <h2>Editing {productTitle}</h2>
                <hr/>
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
                    {product.image_url && <img className="img-fluid img-thumbnail d-block" src={product.image_url}/>}
                    {/* <label htmlFor="image" className="form-label">Image</label>
                    <input type="file" name="image" autoComplete="off" className="form-control" id="image" onChange={handleChange} accept="image/png, image/jpeg" /> */}
                </div>
                {alert && <div className="d-block"><div className="alert alert-danger mb-0" role="alert">{alert}</div></div>}
                {sucess && <div className="d-block"><div className="alert alert-success mb-0" role="alert">{sucess}</div></div>}
                <div className="my-3">
                    <button className="btn btn-primary" type="submit">Submit</button>
                </div>
                </div>
                </form>
            </section>
        </>);
}
     
export default EditProduct;
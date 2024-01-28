import Product from "../product/Product";
import { useState } from "react";
import { baseApiUrl } from "../../App";
import { useEffect } from "react";
import getProducts from "../../services/getPublicProducts";
import Pagination from "../pagination/Pagination";
import { useParams, useLocation } from "react-router-dom";
import { useUserContext } from "../../context/userContext";
import UserArea from "../users/UserArea";
import removeSingleProduct from "../../services/removeProduct";

const Products = () => {

    const [products, setProducts] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    
    const location = useLocation();
    const params = useParams();
    const user = useUserContext();

    const handlePageNumber = (number) =>{
        let split = number.split('?page=');
        
        if(split[1] !== null){
            number = split[1];
        }
        else number = 1;

        setPageNumber(number);
    }


    const handleProducts = async (data) => {
       
        const params = {
            action: null,
            productId: null,
            ...data
        }

        switch (params.action) {
            case 'delete':
                try {
                    const response = await removeSingleProduct({productId: params.productId, access_token: user.user_data.access_token });
                    //const response = { status: true  }
            
                    if(response.status === true){
                        const filterData = products.data.data.filter(item => item.id !== params.productId );
                   
                        const newProducsData = {
                            ...products,
                            data:{
                                ...products.data,
                                data: filterData
                            }
                        };
                        setProducts(newProducsData);

                    }
                  } catch(error){ console.log(error.message); }
              break;
            case 'edit':
              console.log('edit product');
              break;
            case 'add':
                console.log('add');

                products.data.data.unshift(params.data);

                const newProducsData = {
                    ...products
                }

                setProducts(newProducsData);

              break;
     }

    } 


    useEffect( ()=> {

        async function fetchProducts(data) {
            let response = await getProducts(data);
            setProducts(response);
        }

        if(params.number !== null){
            fetchProducts({'page': params.number})
        }
        else{
            fetchProducts({'page': pageNumber})
        }
        

    }, [pageNumber, location])

    return (
        <>
        <UserArea handleProducts={handleProducts}/>
        <div className={!user.isLoggedIn ? 'row': ''}>
            {products && products.data.data.map( (product) => <Product key={product.id} product={product} handleProducts={handleProducts}/> )}
        </div>
        {products && <Pagination currentPage={pageNumber} products={products} handleNumberChange={handlePageNumber}/>}
        </>
    );
}
 
export default Products;
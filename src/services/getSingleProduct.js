import { baseApiUrl } from '../App';
import axios from 'axios';
import { useUserContext } from '../context/userContext';

const getSingleProduct = async (data) => {
    const params = {
        productId: null,
        access_token: null,
        ...data
    }

    try {
       
      const response = await axios.get(baseApiUrl + 'products/'+params.productId, {
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+ params.access_token }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

export default getSingleProduct;
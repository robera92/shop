import { baseApiUrl } from '../App';
import axios from 'axios';

const removeSingleProduct = async (data) => {
    const params = {
        productId: null,
        access_token: null,
        ...data
    }

    try {
       
      const response = await axios.delete(baseApiUrl + 'products/'+params.productId, {
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+ params.access_token }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
};




export default removeSingleProduct;
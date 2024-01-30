import { baseApiUrl } from '../App';
import axios from 'axios';

const editSingleProduct = async (data) => {
    const params = {
        productId: null,
        access_token: null,
        ...data
    }

    params.image = null; // destroy image, not working.

    try {
      const response = await axios.put(baseApiUrl + 'products/'+params.productId, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer '+ params.access_token }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
};




export default editSingleProduct;
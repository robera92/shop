import { baseApiUrl } from '../App';
import axios from 'axios';

const getProducts = async (data) => {
    
    const params = {
        page: 1,
        extra: 0,
        ...data
    }

    try {
       
      const response = await axios.get(baseApiUrl + 'products/view/all?page='+params.page, {
        headers: { 'Content-Type': 'application/json' }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

export default getProducts;
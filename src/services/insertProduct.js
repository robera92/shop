import { baseApiUrl } from '../App';
import axios from 'axios';

const insertProduct = async (data) => {
    const params = {
        title: null,
        description: null,
        price: null,
        image: null,
        user_id: null,
        access_token: null,
        ...data
    }

    try {
       
      const response = await axios.post(baseApiUrl + 'products', {title: params.title, description: params.description, price: params.price, image: params.image, user_id: params.user_id },
       { headers: { 'Content-Type': 'multipart/form-data', 'Authorization': 'Bearer '+ params.access_token } });
      return response.data;
    } catch (error) {
      throw error;
    }
};




export default insertProduct;
import { baseApiUrl } from '../App';
import axios from 'axios';

const loginUser = async (data) => {
    try {
      const response = await axios.post(baseApiUrl + 'auth/login', data, {
        headers: { 'Content-Type': 'application/json' }
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

export default loginUser;
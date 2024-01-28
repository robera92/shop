// "name": "Create User",
// "id": "e663ad10-9e9a-2eac-cf3b-8b5c8d8fc2c6",
// "request": {
// "method": "POST",
// "header": [
// {
// "key": "Content-Type",
// "value": "application/json"
// }
// ],
// "body": {
// "mode": "raw",
// "raw": "{\n\t\"name\": \"Akash\",\n\t\"email\": \"akash@gmaill.com\",\n\t\"password\": \"123456\",\n\t\"password_confirmation\": \"123456\"\n}"
// },
// "url": "http://127.0.0.1:8000/api/auth/register"
// },

import { baseApiUrl } from '../App';
import axios from 'axios';

const registerNewUser = async (data) => {
    try {
      const response = await axios.post(baseApiUrl + 'auth/register', data, {
        headers: { 'Content-Type': 'application/json' }
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

export default registerNewUser;
//Axios instance with base URL declared
import axios from 'axios';

const instance = axios.create({
  baseURL:  "https://immense-island-73623.herokuapp.com/" //Replace it with your backend URL
});

export default instance;
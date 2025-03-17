import axios from 'axios';

export const baseURL = 'https://globalwebsite.genicminds.com/api';
//  export const baseURL = 'http://localhost:5000';
const api = axios.create({
  baseURL,
});

export default api;
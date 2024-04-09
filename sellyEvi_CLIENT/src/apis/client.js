import axios from 'axios';
import {API_URL} from './functions';
export default axios.create({
  baseURL: `${API_URL}/`
});

/* 
User Example:
art@gmail.gu
heyo23456
*/
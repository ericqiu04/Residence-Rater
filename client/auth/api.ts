
import axios from 'axios'
import { getAccessToken } from './tokenStorage'

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  });

export const setToken = (token:any) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        // Remove the Authorization header if the token is null
        delete axios.defaults.headers.common['Authorization'];
    }
}

export default api
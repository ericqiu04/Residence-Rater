
import axios from 'axios'
import { getAccessToken } from './tokenStorage'

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  });

api.interceptors.request.use((config) => {
    const token = getAccessToken()

    if(token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
})

export default api
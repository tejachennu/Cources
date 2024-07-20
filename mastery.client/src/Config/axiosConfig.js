import axios from 'axios';
import Cookies from 'js-cookie';

// Create an instance of axios
const axiosInstance = axios.create({
  baseURL: 'https://localhost:7253/api',
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('JWTToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;  // Add Bearer token
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

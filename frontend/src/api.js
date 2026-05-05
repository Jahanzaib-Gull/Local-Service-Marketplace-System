import axios from 'axios';

const api = axios.create({
  // Use local backend in development, otherwise use the production URL
  baseURL: window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/api' 
    : 'https://local-service-marketplace-system.onrender.com/api',
});

api.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const parsedUserInfo = JSON.parse(userInfo);
      if (parsedUserInfo.token) {
        config.headers.Authorization = `Bearer ${parsedUserInfo.token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

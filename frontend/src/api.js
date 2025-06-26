import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL:"https://triphub-backend-3x8e.onrender.com/api",
});


axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

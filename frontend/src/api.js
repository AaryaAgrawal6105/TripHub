import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL:"http://localhost:5000/api",
    withCredentials :true
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
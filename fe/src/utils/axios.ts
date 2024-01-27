import axios, { AxiosInstance } from 'axios';

// TODO: baseURL should be defined by reading from env var instead hardcode string
const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:4000',
});

export default axiosInstance;

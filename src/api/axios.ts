import axios from "axios";
import {
  authRequestInterceptor,
  authResponseInterceptor,
} from "../auth/authInterceptors";

const API_URL = "http://localhost:3000/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const requestInterceptors = [authRequestInterceptor];
const responseInterceptors = [authResponseInterceptor];

requestInterceptors.forEach(({ onFulfilled, onRejected, options }) => {
  axiosInstance.interceptors.request.use(onFulfilled, onRejected, options);
});
responseInterceptors.forEach(({ onFulfilled, onRejected }) => {
  axiosInstance.interceptors.response.use(onFulfilled, onRejected);
});

export default axiosInstance;

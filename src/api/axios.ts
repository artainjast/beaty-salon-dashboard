import axios from 'axios';
import Router from 'next/router';
import { toast } from 'react-toastify';

const axiosFetch = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL
});

axiosFetch.interceptors.request.use(
  (config) => {
    // const { origin } = new URL(config.url);
    const allowedOrigins = [
      process.env.NODE_ENV === 'production'
        ? process.env.NEXT_PUBLIC_BACKEND_URL
        : process.env.NEXT_PUBLIC_BACKEND_URL_DEMO
    ];
       (config.headers.authorization = localStorage.getItem('accessToken'));
        if (allowedOrigins.includes(origin)) {
         //   config.headers.authorization = `Bearer ${token}`;
        }
    
    return config;
  },
  (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      Router.push('/user/login');
    }
    return Promise.reject(error);
  }
);
axiosFetch.interceptors.response.use(
  (config) => {
    (config.headers.authorization = localStorage.getItem('accessToken'));
    return config;
  },
  (error) => {
    if (error.code === "ERR_NETWORK") {
      toast.error('مشکلی پیش آمده لطفا کمی بعد مراجعه کنید' , {
        position: toast.POSITION.TOP_CENTER })
    } 
    if (error.response) {
      toast.error(error.response.message , {
        position: toast.POSITION.TOP_CENTER })
    }  
    if (error.response.status === 401 || error.response.status === 403) {
      localStorage.removeItem('accessToken');
      Router.push('/user/login');
      toast.error(error.response.message || 'لطفا وارد شوید' , {
        position: toast.POSITION.TOP_CENTER })
    }
    return Promise.reject(error);
  }
);

export default axiosFetch
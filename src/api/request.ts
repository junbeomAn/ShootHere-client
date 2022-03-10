import axios from 'axios';

export const Axios = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: `http://localhost:3000`,
});

Axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

import axios from 'axios';

export const Axios = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: `https://shoothere-server.herokuapp.com`,
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

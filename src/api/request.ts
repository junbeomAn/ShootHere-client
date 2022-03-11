import axios from 'axios';

export const Axios = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL:
    process.env.NODE_ENV === 'development'
      ? `http://localhost:3000`
      : `https://shoothere-server.herokuapp.com`,
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

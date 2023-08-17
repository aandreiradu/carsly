import axios from 'axios';

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_URL;

axios.defaults.withCredentials = true;

const _axios = axios.create({
  baseURL: BACKEND_BASE_URL,
  withCredentials: true,
  timeout: 30000,
});

export default _axios;

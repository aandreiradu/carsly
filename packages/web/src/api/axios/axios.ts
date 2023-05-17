import axios from 'axios';

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_PORT;

const _axios = axios.create({
  baseURL: BACKEND_BASE_URL,
});

export default _axios;

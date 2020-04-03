import axios from 'axios';

const api = axios.create({
  baseURL: 'https://c8a521f6.ngrok.io',
});

export default api;

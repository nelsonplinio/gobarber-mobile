import axios from 'axios';

const api = axios.create({
  baseURL: 'http://ef1e98f8.ngrok.io',
});

export default api;

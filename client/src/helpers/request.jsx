import axios from 'axios';

const AuthAxios = axios.create({
  baseURL: 'http://localhost:8000', 
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default AuthAxios;

import AuthAxios from "../helpers/request";


const API = AuthAxios.create({ baseURL: 'http://localhost:8000/v1' });

export const getMessages = (id) => API.get(`/messages/${id}`);

export const addMessage = (data) => API.post('/messages/add', data);
import AuthAxios from "../helpers/request";

const API = AuthAxios.create({ baseURL: 'http://localhost:8000/v1' });

export const createChat = (data) => API.post('/chats/add', data);

export const userChats = (id) => API.get(`/chats/${id}`);

export const findChat = (firstId, secondId) => API.get(`/chats/find/${firstId}/${secondId}`);
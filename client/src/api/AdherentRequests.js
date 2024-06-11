import AuthAxios from "../helpers/request";

const API = AuthAxios.create({ baseURL: 'http://localhost:8000/v1' });

API.interceptors.request.use((req) => {
    const profile = Cookies.get('profile');
    if (profile) {
      req.headers.Authorization = `Bearer ${JSON.parse(profile).token}`;
    }
    
    return req;
  });

  export const getAdherent = (userId) => API.get(`/adherents/${userId}`);
export const getAdherents = () => API.get(`/adherents`);

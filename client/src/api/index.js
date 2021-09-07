import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000'})

const url = 'http://localhost:5000/posts';

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);


export const getSpaces = (waveData) => API.get('/spaces/get', waveData);
export const newSpace = (waveData) => API.post('/spaces/new', waveData);
export const delSpace = (waveData) => API.delete('/spaces/del', waveData);
export const updateSpace = (waveData) => API.post('/spaces/update', waveData);


export const fetchPosts = () => axios.get(url);
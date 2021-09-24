import axios from 'axios';

const API = axios.create({ baseURL: 'http://161.35.12.211:5000'})

const url = 'http://161.35.12.211:5000/posts';

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);


export const getSpaces = (getData) => API.post('/spaces/get', getData);
export const newSpace = (waveData) => API.post('/spaces/new', waveData);
export const delSpace = (delData) => API.post('/spaces/del', delData);
export const updateSpace = (updData) => API.post('/spaces/update', updData);


export const fetchPosts = () => axios.get(url);
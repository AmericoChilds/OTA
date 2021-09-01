import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000'})

const url = 'http://localhost:5000/posts';

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

export const fetchPosts = () => axios.get(url);
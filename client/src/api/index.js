import axios from 'axios';

const url = 'https://mine-memories-project.herokuapp.com/posts';

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url,newPost);
export const updatePost = (id,newPost) => axios.patch(`${url}/${id}`,newPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
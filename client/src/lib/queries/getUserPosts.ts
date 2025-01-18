import { api } from '../axios';

export const getUserPosts = async () => { 
  const { data } = await api.get('/get-user-posts');
  return data; 
};
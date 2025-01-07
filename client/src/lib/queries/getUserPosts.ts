import { api } from '../axios';

export const getUserPosts = async () => {
  const token = localStorage.getItem('token');
  const { data } = await api.get('/get-user-posts',
    {headers: {'x-access-token': token }}
  );
  return data; 
};
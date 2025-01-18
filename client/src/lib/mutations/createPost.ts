import { api } from "../axios";


interface NewPostData {
  title: string;
  content: string;
}

export async function createPost(postData: NewPostData) {
  const response = await api.post('/create-post', postData);
  return response.data;
}

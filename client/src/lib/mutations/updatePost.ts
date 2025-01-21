import { api } from "../axios";

interface Post {
    id: number;
    title: string;
    content: string;
    createdAt: number;
  }

export interface UpdatePostData {
    title?: string;
    content?: string;
  }

export async function updatePost(postId: number, data: UpdatePostData): Promise<Post> {
    const response = await api.patch(`/update-post/${postId}`, data);
    return response.data;
}
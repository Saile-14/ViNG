import { api } from "../axios";

export async function deletePost(postId: number): Promise<void> {
  await api.delete(`/delete-post/${postId}`);
}
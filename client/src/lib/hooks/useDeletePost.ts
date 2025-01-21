import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { deletePost } from '../mutations/deletePost';

export function useDeletePost(
    options?: UseMutationOptions<any, Error, number>
) {
    return useMutation({
        mutationFn: (postId: number) =>
            deletePost(postId),
        ...options
    })};
import { useMutation, UseMutationOptions} from '@tanstack/react-query';
import { updatePost, UpdatePostData } from '../mutations/updatePost';

type UpdatePostVariables = {
    postId: number;
    data: UpdatePostData;
};


export function useUpdatePost(
    options?: UseMutationOptions<any, Error, UpdatePostVariables>
) {
    return useMutation({
        mutationFn: (variables: UpdatePostVariables) =>
            updatePost(variables.postId, variables.data),
        ...options
    })};
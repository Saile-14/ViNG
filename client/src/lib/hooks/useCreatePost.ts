import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '../mutations/createPost';
export function useCreatePost() {

    const queryClient = useQueryClient();

    const mutate = useMutation({
        mutationFn: createPost,
        onSuccess: async (newPost) => {
            await queryClient.invalidateQueries(
                {queryKey: ['posts', 'user-posts']});
              console.log('Post created:', newPost);
    
          
        },
        onError: (error) => {
          console.error('Error creating post:', error);
        },
      });

    return mutate;
}
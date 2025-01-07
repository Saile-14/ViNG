import { useQuery } from '@tanstack/react-query';
import { getUserPosts } from '../queries/getUserPosts';

export function useUserPosts() {
  return useQuery({
    queryKey: ['user-posts'], 
    queryFn: getUserPosts,
  });
}
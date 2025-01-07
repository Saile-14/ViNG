import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../queries/getPosts';

export function usePosts() {
  return useQuery({
    queryKey: ['posts'], 
    queryFn: getPosts,
  });
}
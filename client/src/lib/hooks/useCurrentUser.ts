import { useQuery } from '@tanstack/react-query';
import { getCurrentUser, User } from '../queries/getCurrentUser';

export function useCurrentUser() {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    enabled: !!localStorage.getItem('token'),
  });
}
import { api } from "../axios";

export interface User {
  id: number;
}

export const getCurrentUser = async (): Promise<User> => {
  const { data } = await api.get('/me');
  return data;
};
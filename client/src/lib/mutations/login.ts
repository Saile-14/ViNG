import { api } from "../axios";

export const loginMutation = async (loginData: {email: string, password: string}) => {
    try {
        const { data } = await api.post('/login', loginData);
        return data;
      } catch (error: any) {
        throw new Error(error.response?.data?.error || 'Login failed');
      }
}
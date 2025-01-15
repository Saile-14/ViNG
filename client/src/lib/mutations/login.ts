import { api } from "../axios";

export const login = async (loginData: {email: string, password: string}) => {
    const { data } = await api.post('/login', loginData);
    return data;
}
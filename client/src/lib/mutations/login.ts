import { api } from "../axios";

export const login = async (formData: {email: string, password: string}) => {
    const { data } = await api.post('/login', formData);
    return data;
}
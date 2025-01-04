import { api } from "../axios";

export const getPosts = async () => {
    const { data } = await api.get("/get-posts");
    return data;
};
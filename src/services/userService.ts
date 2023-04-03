import { IUser } from "../interfaces/user";
import { api } from "./api";

export const getUsers = async (): Promise<IUser[]> => {
  const response = await api.get("/users").catch(err => {
    throw err;
  });
  return response.data;
};

export const getUserById = async (id: number): Promise<IUser> => {
  const response = await api.get(`/users/${id}`).catch(err => {
    throw err;
  });
  return response.data;
};
